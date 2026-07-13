"use client";

import { useEffect, useState } from "react";
import { DemoDrawer } from "./DemoDrawer";
import {
  attachSessionToProject,
  deleteProject,
  ensureDefaultProject,
  setActiveProjectId,
  upsertProject,
} from "@/lib/demo/storage";
import { useActiveProjectId, useProjects } from "@/lib/demo/hooks";
import { uid } from "@/lib/demo/storage";
import type { DemoProject, ProjectType } from "@/lib/demo/types";

const PROJECT_TYPES: ProjectType[] = [
  "company_review",
  "client_work",
  "marketing",
  "operations",
  "hr_team",
  "investment",
  "api_product",
  "other",
];

const TYPE_LABELS: Record<"en" | "ar", Record<ProjectType, string>> = {
  en: {
    company_review: "Company Review",
    client_work: "Client Work",
    marketing: "Marketing",
    operations: "Operations",
    hr_team: "HR / Team",
    investment: "Investment",
    api_product: "API / Product",
    other: "Other",
  },
  ar: {
    company_review: "مراجعة شركة",
    client_work: "عمل عميل",
    marketing: "التسويق",
    operations: "العمليات",
    hr_team: "الموارد البشرية / الفريق",
    investment: "الاستثمار",
    api_product: "API / المنتج",
    other: "أخرى",
  },
};

type ProjectsDrawerProps = {
  locale: "en" | "ar";
  activeSessionId?: string;
  onClose: () => void;
};

export function ProjectsDrawer({ locale, activeSessionId, onClose }: ProjectsDrawerProps) {
  const isArabic = locale === "ar";
  const projects = useProjects();
  const activeProjectId = useActiveProjectId();
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<ProjectType>("company_review");
  const [description, setDescription] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    ensureDefaultProject(locale);
  }, [locale]);

  const labels = isArabic
    ? {
        title: "المشاريع",
        subtitle: "نظّم جلسات Chameleon حسب الشركة أو العميل أو القسم أو حالة العمل.",
        demoNote:
          "وضع تجريبي: يتم حفظ المشاريع محلياً داخل هذا المتصفح. في النسخة الإنتاجية سيتم مزامنة المشاريع عبر الأجهزة بعد تفعيل الحسابات والخادم الخلفي.",
        newProject: "مشروع جديد",
        search: "البحث في المشاريع",
        open: "فتح المشروع",
        active: "نشط",
        rename: "إعادة تسمية",
        delete: "حذف",
        attach: "ربط الجلسة الحالية",
        attached: "مرتبطة",
        save: "حفظ",
        cancel: "إلغاء",
        create: "إنشاء المشروع",
        nameLabel: "اسم المشروع",
        typeLabel: "نوع المشروع",
        descriptionLabel: "وصف مختصر",
        sessionsCount: "جلسات",
        emptyTitle: "لا توجد مشاريع بعد.",
        emptyBody: "أنشئ مشروعاً لتنظيم جلسات Chameleon حسب حالة العمل.",
        emptyCta: "إنشاء أول مشروع",
        confirmDelete: "حذف هذا المشروع؟ لا يمكن التراجع.",
      }
    : {
        title: "Projects",
        subtitle: "Organize your Chameleon sessions by company, client, department, or business case.",
        demoNote:
          "Demo mode: projects are saved locally in this browser. Production will sync projects across devices after accounts and backend are enabled.",
        newProject: "New Project",
        search: "Search projects",
        open: "Open Project",
        active: "Active",
        rename: "Rename",
        delete: "Delete",
        attach: "Attach current session",
        attached: "Attached",
        save: "Save",
        cancel: "Cancel",
        create: "Create Project",
        nameLabel: "Project name",
        typeLabel: "Project type",
        descriptionLabel: "Short description",
        sessionsCount: "sessions",
        emptyTitle: "No projects yet.",
        emptyBody: "Create a project to organize your Chameleon sessions by business case.",
        emptyCta: "Create First Project",
        confirmDelete: "Delete this project? This cannot be undone.",
      };

  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  function resetForm() {
    setName("");
    setType("company_review");
    setDescription("");
    setCreating(false);
  }

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;
    const now = new Date().toISOString();
    const project: DemoProject = {
      id: uid(),
      name: trimmed,
      description: description.trim(),
      type,
      createdAt: now,
      updatedAt: now,
      sessionIds: [],
      language: locale,
    };
    upsertProject(project);
    setActiveProjectId(project.id);
    resetForm();
  }

  function handleOpen(id: string) {
    setActiveProjectId(id);
  }

  function startRename(project: DemoProject) {
    setRenamingId(project.id);
    setRenameValue(project.name);
  }

  function confirmRename(project: DemoProject) {
    const trimmed = renameValue.trim();
    if (trimmed) {
      upsertProject({ ...project, name: trimmed, updatedAt: new Date().toISOString() });
    }
    setRenamingId(null);
  }

  function handleDelete(id: string) {
    if (confirm(labels.confirmDelete)) deleteProject(id);
  }

  function handleAttach(project: DemoProject) {
    if (!activeSessionId) return;
    attachSessionToProject(project.id, activeSessionId);
  }

  return (
    <DemoDrawer locale={locale} title={labels.title} onClose={onClose}>
      <p className="text-sm leading-6 text-muted">{labels.subtitle}</p>
      <p className="mt-3 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-[11px] leading-5 text-gold">
        {labels.demoNote}
      </p>

      {!creating ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-xs font-medium text-emerald transition-colors hover:bg-emerald/15"
          >
            + {labels.newProject}
          </button>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.search}
            className="min-w-[160px] flex-1 rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-xs text-foreground outline-none focus:border-emerald/40"
          />
        </div>
      ) : (
        <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-background/60 p-3">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.typeLabel}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ProjectType)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABELS[locale][t]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.descriptionLabel}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCreate}
              disabled={!name.trim()}
              className="rounded-full border border-emerald/30 bg-emerald px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {labels.create}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-muted transition-colors hover:text-foreground"
            >
              {labels.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {filtered.length === 0 && !creating ? (
          <div className="rounded-xl border border-white/10 bg-background/40 p-5 text-center">
            <p className="text-sm font-medium text-foreground">{labels.emptyTitle}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{labels.emptyBody}</p>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="mt-3 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-xs font-medium text-emerald transition-colors hover:bg-emerald/15"
            >
              {labels.emptyCta}
            </button>
          </div>
        ) : (
          filtered.map((project) => {
            const isActive = project.id === activeProjectId;
            const alreadyAttached =
              !!activeSessionId && project.sessionIds.includes(activeSessionId);
            return (
              <div
                key={project.id}
                className={`rounded-xl border p-3 ${
                  isActive ? "border-emerald/40 bg-emerald/5" : "border-white/10 bg-background/40"
                }`}
              >
                {renamingId === project.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-emerald/40"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => confirmRename(project)}
                      className="rounded-lg border border-emerald/30 px-2 py-1 text-xs text-emerald"
                    >
                      {labels.save}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{project.name}</p>
                      <p className="mt-0.5 text-[10px] text-muted">
                        {TYPE_LABELS[locale][project.type]} · {project.sessionIds.length}{" "}
                        {labels.sessionsCount}
                      </p>
                      {project.description ? (
                        <p className="mt-1 line-clamp-2 text-xs text-muted">{project.description}</p>
                      ) : null}
                    </div>
                    {isActive ? (
                      <span className="shrink-0 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-[10px] text-emerald">
                        {labels.active}
                      </span>
                    ) : null}
                  </div>
                )}

                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpen(project.id)}
                    className="rounded-lg border border-white/10 px-2.5 py-1 text-[10px] text-muted transition-colors hover:border-emerald/30 hover:text-emerald"
                  >
                    {labels.open}
                  </button>
                  <button
                    type="button"
                    onClick={() => startRename(project)}
                    className="rounded-lg border border-white/10 px-2.5 py-1 text-[10px] text-muted transition-colors hover:text-foreground"
                  >
                    {labels.rename}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    className="rounded-lg border border-red-400/30 px-2.5 py-1 text-[10px] text-red-400 transition-colors hover:bg-red-400/5"
                  >
                    {labels.delete}
                  </button>
                  {activeSessionId ? (
                    <button
                      type="button"
                      onClick={() => handleAttach(project)}
                      disabled={alreadyAttached}
                      className="rounded-lg border border-gold/20 px-2.5 py-1 text-[10px] text-gold transition-colors hover:bg-gold/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {alreadyAttached ? labels.attached : labels.attach}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </DemoDrawer>
  );
}
