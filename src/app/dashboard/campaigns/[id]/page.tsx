'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CampaignForm from '@/components/campaigns/CampaignForm';

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`http://localhost:8000/campaigns/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCampaign(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCampaign();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Campaign</h1>
      <CampaignForm initialData={campaign} isEdit={true} />
    </div>
  );
}
