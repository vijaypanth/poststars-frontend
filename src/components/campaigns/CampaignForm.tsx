"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

interface CampaignFormProps {
  initialData?: {
    id?: number;
    name?: string;
    goal?: string;
    platform?: string;
  };
  isEdit?: boolean;
}

const platforms = ["Facebook", "Instagram", "LinkedIn", "X"];

export default function CampaignForm({
  initialData = {},
  isEdit = false,
}: CampaignFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [goal, setGoal] = useState(initialData.goal || "");
  const [platform, setPlatform] = useState(initialData.platform || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !goal || !platform) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      
      if (isEdit) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/${initialData.id}`, {
          name,
          goal,
          platform,
        });
        toast.success("Campaign updated successfully!");
      } else {
        await axios.post("${process.env.NEXT_PUBLIC_API_URL}/campaigns/", {
          name,
          goal,
          platform,
        });
        toast.success("Campaign created successfully!");
      }
      router.push("/dashboard/campaigns");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Campaign" : "Create Campaign"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Campaign name"
          />
        </div>
        <div>
          <label className="block mb-1">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Campaign goal"
          />
        </div>
        <div>
          <label className="block mb-1">Platform</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`px-3 py-1 rounded-full border transition ${
                  platform === p
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Campaign" : "Create Campaign"}
        </Button>
      </form>
    </div>
  );
}
