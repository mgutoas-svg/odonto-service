'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkAuth()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Odonto Service</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-2">Bem-vindo, {user?.email}</h2>
        <p className="text-gray-600 mb-8">Selecione um módulo para começar</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Módulos */}
          <ModuleCard
            title="👥 Pacientes"
            description="Gerenciar cadastro de pacientes"
            href="/dashboard/pacientes"
          />
          <ModuleCard
            title="📅 Agenda"
            description="Agendar consultas e procedimentos"
            href="/dashboard/agenda"
          />
          <ModuleCard
            title="📋 Prontuário"
            description="Acompanhar evolução clínica"
            href="/dashboard/prontuario"
          />
          <ModuleCard
            title="🦷 Ortodontia"
            description="Planos e acompanhamento ortodôntico"
            href="/dashboard/ortodontia"
          />
          <ModuleCard
            title="💰 Orçamentos"
            description="Criar orçamentos e propostas"
            href="/dashboard/orcamentos"
          />
          <ModuleCard
            title="📄 Contratos"
            description="Gerenciar contratos de serviço"
            href="/dashboard/contratos"
          />
          <ModuleCard
            title="💳 Financeiro"
            description="Contas a receber e fluxo de caixa"
            href="/dashboard/financeiro"
          />
          <ModuleCard
            title="📦 Estoque"
            description="Controle de materiais"
            href="/dashboard/estoque"
          />
          <ModuleCard
            title="📊 Relatórios"
            description="Visualizar relatórios e análises"
            href="/dashboard/relatorios"
          />
        </div>
      </main>
    </div>
  )
}

function ModuleCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
