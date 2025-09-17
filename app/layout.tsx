import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { I18nProvider } from "@/components/i18n-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "BharatVerse - Global Indian Community Hub",
  description:
    "Connect with the global Indian diaspora, discover events, share stories, and celebrate culture together.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
