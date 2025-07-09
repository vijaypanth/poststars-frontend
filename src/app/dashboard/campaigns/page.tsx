import CampaignList from '@/components/campaigns/CampaignList';

export default function CampaignsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Campaigns</h1>
      <CampaignList />
    </main>
  );
}
