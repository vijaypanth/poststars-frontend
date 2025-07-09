"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import CampaignList from '@/components/campaigns/CampaignList';

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) router.push("/login")
      else setUser(data.user)
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="space-x-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        <a href="/dashboard/campaigns/create" className="bg-purple-600 text-white px-4 py-2 rounded">Create New Campaign</a>
      </div>
      <div>
        <h2 className="text-xl mb-4">Welcome, {user?.email}</h2>
        
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6">Campaigns List</h1>
              <CampaignList />
      </div>
    </main>
  )
}
