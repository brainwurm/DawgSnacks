"use client";
import { useSession } from "next-auth/react";
import Header from '@/components/ui-elements/Header';

export default function HistoryPage() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] text-white">
      <Header session={session || null} />
      
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">History</h1>
        {/* History page content here */}
      </div>
    </div>
  );
}
