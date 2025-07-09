'use client'

import { useRouter } from 'next/navigation'
import CampaignForm from '@/components/campaigns/CampaignForm'
import axios from 'axios'

export default function CampaignCreatePage() {
  const router = useRouter()

  const handleCreate = async (data: { name: string; goal: string; platform: string }) => {
    await axios.post('http://localhost:8000/campaigns', data)
    router.push('/dashboard/campaigns')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
      <CampaignForm onSubmit={handleCreate} />
    </div>
  )
}
