"use client"

import { useI18n } from "./i18n-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useI18n()
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
      className="bg-transparent border border-border rounded-md px-2 py-1 text-sm"
    >
      <option value="en">🇺🇸 English</option>
      <option value="hi">🇮🇳 हिन्दी</option>
    </select>
  )
}


