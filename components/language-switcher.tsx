"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ChevronDown } from "lucide-react"
import { useI18n } from "./i18n-provider"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language: currentLanguage, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  ]

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <div className={`relative ${className}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-background/50 backdrop-blur-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm">
            {currentLang?.flag} {currentLang?.name}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                onClick={() => {
                  setLanguage(language.code as "en" | "hi")
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors"
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {language.code === currentLanguage && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
