'use client'

import { useState } from 'react'

export type DateRange = 'today' | '7d' | '30d' | 'month'

const tabs: { value: DateRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: 'month', label: 'This month' },
]

interface DateFilterProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
}

export function DateFilter({ value: controlledValue, onChange }: DateFilterProps) {
  const [internalValue, setInternalValue] = useState<DateRange>('30d')
  const value = controlledValue ?? internalValue

  function handleChange(v: DateRange) {
    setInternalValue(v)
    onChange?.(v)
  }

  return (
    <div className="flex gap-1 rounded-lg border border-white/8 bg-panel p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleChange(tab.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === tab.value
              ? 'bg-emerald/10 text-emerald border border-emerald/20'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
