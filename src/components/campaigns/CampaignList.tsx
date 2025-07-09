'use client';

import { useEffect, useState } from 'react';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/campaigns/');
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      alert('Failed to load campaigns');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this campaign?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/campaigns/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Deleted successfully');
        fetchCampaigns();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Error deleting campaign');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="space-y-4">
      {campaigns.map((c: any) => (
        <div key={c.id} className="p-4 border rounded flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p>Goal: {c.goal}</p>
            <p>Platform: {c.platform}</p>
          </div>
          <div className="space-x-2">
            <a href={`/dashboard/campaigns/${c.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </a>
            <button onClick={() => handleDelete(c.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
