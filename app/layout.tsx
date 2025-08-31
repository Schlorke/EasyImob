import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/components/providers/query-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EasyImob Analytics Dashboard - UNIVALI HOW VII",
  description: "Sistema de análise de vendas imobiliárias - Projeto acadêmico UNIVALI",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
