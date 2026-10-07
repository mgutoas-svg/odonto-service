import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Odonto Service - Gestão Odontológica',
  description: 'Sistema completo de gestão para clínicas odontológicas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
