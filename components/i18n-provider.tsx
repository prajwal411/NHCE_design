"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"

type LanguageCode = "en" | "hi"

type I18nContextType = {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<string, { en: string; hi: string }> = {
  welcome: { en: "Welcome back, Priya!", hi: "वापसी पर स्वागत है, प्रिया!" },
  subheading: {
    en: "Here's what's happening in your community today.",
    hi: "आज आपकी कम्युनिटी में क्या हो रहा है।",
  },
  achievementsTitle: { en: "Your Achievements", hi: "आपकी उपलब्धियाँ" },
  quickActionsTitle: { en: "Quick Actions", hi: "त्वरित कार्य" },
  quickActionsDesc: { en: "Get started with these popular activities", hi: "इन लोकप्रिय कार्यों से शुरू करें" },
  upcomingTitle: { en: "Upcoming Events Near You", hi: "आपके पास होने वाले कार्यक्रम" },
  upcomingDesc: { en: "Events in San Francisco Bay Area", hi: "सैन फ्रांसिस्को बे एरिया में कार्यक्रम" },
  highlightsTitle: { en: "Community Highlights", hi: "कम्युनिटी हाइलाइट्स" },
  highlightsDesc: { en: "Recent posts from your network", hi: "आपके नेटवर्क से हाल की पोस्टें" },
  profileTitle: { en: "Profile Completion", hi: "प्रोफ़ाइल पूर्णता" },
  profileDesc: { en: "Complete your profile to connect better", hi: "बेहतर कनेक्ट करने के लिए अपनी प्रोफ़ाइल पूरी करें" },
  yourCommunitiesTitle: { en: "Your Communities", hi: "आपकी कम्युनिटीज़" },
  yourCommunitiesDesc: { en: "Groups you're part of", hi: "वे समूह जिनका आप हिस्सा हैं" },
  yourImpactTitle: { en: "Your Impact", hi: "आपका प्रभाव" },
  rsvp: { en: "RSVP", hi: "आरएसवीपी" },
  learnMore: { en: "Learn More", hi: "और जानें" },
  completeProfile: { en: "Complete Profile", hi: "प्रोफ़ाइल पूरी करें" },
  joinMoreGroups: { en: "Join More Groups", hi: "और समूहों से जुड़ें" },
  profileProgress: { en: "Profile Progress", hi: "प्रोफ़ाइल प्रगति" },
  points: { en: "Points", hi: "अंक" },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en")

  const t = useMemo(() => {
    return (key: string) => translations[key]?.[language] ?? key
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}


