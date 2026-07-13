"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type VoiceState = "idle" | "listening" | "processing" | "unsupported" | "denied";

type VoicePanelProps = {
  locale: "en" | "ar";
  voiceEnabled: boolean;
  onVoiceToggle: (enabled: boolean) => void;
  transcript: string;
  onTranscriptChange: (text: string) => void;
  onSendTranscript?: () => void;
  onListeningChange?: (listening: boolean) => void;
  lastReplyText?: string;
  expanded?: boolean;
};

export type VoiceControlsHandle = {
  speak: (text: string) => void;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  isListening: () => boolean;
};

type DemoSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult:
    | ((event: {
        resultIndex: number;
        results: {
          length: number;
          [index: number]: {
            isFinal: boolean;
            [index: number]: { transcript: string };
          };
        };
      }) => void)
    | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function getSpeechRecognitionCtor() {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    webkitSpeechRecognition?: new () => DemoSpeechRecognition;
    SpeechRecognition?: new () => DemoSpeechRecognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function isSpeechOutputSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export const VoicePanel = forwardRef<VoiceControlsHandle, VoicePanelProps>(
  function VoicePanel(
    {
      locale,
      voiceEnabled,
      onVoiceToggle,
      transcript,
      onTranscriptChange,
      onSendTranscript,
      onListeningChange,
      lastReplyText,
      expanded = true,
    },
    ref,
  ) {
    const isArabic = locale === "ar";
    const Ctor = getSpeechRecognitionCtor();
    const inputSupported = Boolean(Ctor);
    const outputSupported = isSpeechOutputSupported();

    const [voiceState, setVoiceState] = useState<VoiceState>(
      inputSupported ? "idle" : "unsupported",
    );
    const [speaking, setSpeaking] = useState(false);
    const [restartNote, setRestartNote] = useState(false);
    const [arabicVoiceNote, setArabicVoiceNote] = useState(false);

    const recognitionRef = useRef<DemoSpeechRecognition | null>(null);
    const userStoppedRef = useRef(true);
    const finalTranscriptRef = useRef("");

    const labels = isArabic
      ? {
          heading: "الصوت",
          voiceOn: "الرد الصوتي: تشغيل",
          voiceOff: "الرد الصوتي: إيقاف",
          speak: "اضغط للتحدث",
          listening: "يستمع الآن...",
          stop: "إيقاف",
          sendTranscript: "إرسال النص",
          clear: "مسح النص",
          read: "قراءة آخر إجابة",
          stopVoice: "إيقاف الصوت",
          inputUnsupported:
            "إدخال الصوت غير مدعوم في هذا المتصفح. يمكنك الكتابة بدلاً من ذلك.",
          outputUnsupported: "الرد الصوتي غير مدعوم في هذا المتصفح.",
          micNote: "قد يطلب المتصفح إذن استخدام الميكروفون.",
          restarted: "تم إعادة التشغيل.",
          arabicNote: "صوت عربي غير متوفر — يستخدم المتصفح الصوت الافتراضي.",
        }
      : {
          heading: "Voice",
          voiceOn: "Voice Reply: On",
          voiceOff: "Voice Reply: Off",
          speak: "Speak",
          listening: "Listening...",
          stop: "Stop",
          sendTranscript: "Send transcript",
          clear: "Clear transcript",
          read: "Read Last Answer",
          stopVoice: "Stop voice",
          inputUnsupported:
            "Voice input is not supported in this browser. You can type instead.",
          outputUnsupported: "Voice reply is not supported in this browser.",
          micNote: "Your browser may ask for microphone permission.",
          restarted: "Listening restarted.",
          arabicNote: "Arabic voice unavailable — using default browser voice.",
        };

    const speak = useCallback(
      (text: string) => {
        if (!text || !outputSupported) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = isArabic ? "ar-EG" : "en-US";
        const voices = window.speechSynthesis.getVoices();
        const match = voices.find((v) =>
          isArabic ? v.lang.startsWith("ar") : v.lang.startsWith("en"),
        );
        if (match) utter.voice = match;
        else if (isArabic) setArabicVoiceNote(true);
        utter.onstart = () => setSpeaking(true);
        utter.onend = () => setSpeaking(false);
        utter.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utter);
      },
      [isArabic, outputSupported],
    );

    const stopListening = useCallback(() => {
      userStoppedRef.current = true;
      recognitionRef.current?.stop();
      setVoiceState("idle");
      onListeningChange?.(false);
    }, [onListeningChange]);

    const startListening = useCallback(() => {
      if (!Ctor || !recognitionRef.current) return;
      try {
        userStoppedRef.current = false;
        finalTranscriptRef.current = transcript;
        setVoiceState("listening");
        onListeningChange?.(true);
        recognitionRef.current.start();
      } catch {
        /* already started */
      }
    }, [Ctor, transcript, onListeningChange]);

    const toggleListening = useCallback(() => {
      if (voiceState === "listening") stopListening();
      else startListening();
    }, [voiceState, stopListening, startListening]);

    useImperativeHandle(
      ref,
      () => ({
        speak,
        startListening,
        stopListening,
        toggleListening,
        isListening: () => voiceState === "listening",
      }),
      [speak, startListening, stopListening, toggleListening, voiceState],
    );

    useEffect(() => {
      if (!Ctor) {
        setVoiceState("unsupported");
        return;
      }
      const rec = new Ctor();
      rec.lang = isArabic ? "ar-EG" : "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onresult = (event) => {
        let interim = "";
        let finalText = finalTranscriptRef.current;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0]?.transcript ?? "";
          if (event.results[i].isFinal) {
            finalText += piece;
          } else {
            interim += piece;
          }
        }
        finalTranscriptRef.current = finalText;
        onTranscriptChange(finalText + interim);
      };

      rec.onerror = (event) => {
        if (event.error === "not-allowed") {
          setVoiceState("denied");
          userStoppedRef.current = true;
          onListeningChange?.(false);
        }
      };

      rec.onend = () => {
        if (!userStoppedRef.current) {
          setRestartNote(true);
          setTimeout(() => setRestartNote(false), 2500);
          try {
            rec.start();
          } catch {
            setVoiceState("idle");
            onListeningChange?.(false);
          }
        } else {
          setVoiceState("idle");
          onListeningChange?.(false);
        }
      };

      recognitionRef.current = rec;
      return () => {
        userStoppedRef.current = true;
        rec.abort();
      };
    }, [Ctor, isArabic, onTranscriptChange, onListeningChange]);

    function clearTranscript() {
      finalTranscriptRef.current = "";
      onTranscriptChange("");
    }

    function stopSpeaking() {
      if (outputSupported) window.speechSynthesis.cancel();
      setSpeaking(false);
    }

    if (!expanded) return null;

    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="mb-3 rounded-xl border border-white/8 bg-panel2/50 p-3 backdrop-blur-sm"
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gold">
            {labels.heading}
          </p>
          {voiceState === "listening" ? (
            <span className="animate-pulse text-[10px] text-emerald">{labels.listening}</span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onVoiceToggle(!voiceEnabled)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              voiceEnabled
                ? "border-emerald/40 bg-emerald/10 text-emerald"
                : "border-white/10 text-muted"
            }`}
          >
            {voiceEnabled ? labels.voiceOn : labels.voiceOff}
          </button>

          {voiceState === "unsupported" ? (
            <span className="text-xs text-muted">{labels.inputUnsupported}</span>
          ) : voiceState === "denied" ? (
            <span className="text-xs text-red-400">{labels.micNote}</span>
          ) : (
            <>
              {voiceState !== "listening" ? (
                <button
                  type="button"
                  onClick={startListening}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted hover:text-emerald"
                >
                  {labels.speak}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopListening}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs text-gold"
                >
                  {labels.stop}
                </button>
              )}
            </>
          )}

          {outputSupported && lastReplyText ? (
            <button
              type="button"
              onClick={() => speak(lastReplyText)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              {labels.read}
            </button>
          ) : null}

          {speaking ? (
            <button
              type="button"
              onClick={stopSpeaking}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted"
            >
              {labels.stopVoice}
            </button>
          ) : null}
        </div>

        {voiceState !== "unsupported" ? (
          <p className="mt-2 text-[10px] text-muted/70">{labels.micNote}</p>
        ) : null}

        {restartNote ? (
          <p className="mt-1 text-[10px] text-emerald/80">{labels.restarted}</p>
        ) : null}

        {transcript && voiceState === "listening" ? (
          <div className="mt-2 rounded-lg border border-white/8 bg-background/60 px-3 py-2 text-xs text-foreground">
            {transcript}
          </div>
        ) : null}

        {transcript ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {onSendTranscript ? (
              <button
                type="button"
                onClick={onSendTranscript}
                className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[10px] text-emerald"
              >
                {labels.sendTranscript}
              </button>
            ) : null}
            <button
              type="button"
              onClick={clearTranscript}
              className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-muted"
            >
              {labels.clear}
            </button>
          </div>
        ) : null}

        {!outputSupported ? (
          <p className="mt-2 text-[10px] text-muted">{labels.outputUnsupported}</p>
        ) : null}

        {arabicVoiceNote ? (
          <p className="mt-1 text-[10px] text-muted">{labels.arabicNote}</p>
        ) : null}
      </div>
    );
  },
);

/** @deprecated use VoicePanel */
export const VoiceControls = VoicePanel;
