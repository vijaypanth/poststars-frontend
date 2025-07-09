"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push("/dashboard")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded" placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded" placeholder="Password" required />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </main>
  )
}
