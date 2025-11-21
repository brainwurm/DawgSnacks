import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#3B0270] border-r border-gray-500 rounded-lg p-4">
      <nav className="space-y-4">
        <Link href="/authenticated-view">
          <button className="w-full text-left px-4 py-2 text-white hover:bg-[#4C1B7A] rounded transition">
            <img src="/home_icon.svg" alt="Home" className="inline mr-2 w-5 h-5" />
            Home
          </button>
        </Link>
        <Link href="/add-recipe">
          <button className="w-full text-left px-4 py-2 text-white hover:bg-[#4C1B7A] rounded transition">
            <img src="/add_icon.svg" alt="Add" className="inline mr-2 w-5 h-5" />
            Add Recipe
          </button>
        </Link>
        <Link href="/history">
          <button className="w-full text-left px-4 py-2 text-white hover:bg-[#4C1B7A] rounded transition">
            <img src="/history_icon.svg" alt="History" className="inline mr-2 w-5 h-5" />
            History
          </button>
        </Link>
        <Link href="/personal-info-page/1">
          <button className="w-full text-left px-4 py-2 text-white hover:bg-[#4C1B7A] rounded transition">
            <img src="/profile_icon.svg" alt="Profile" className="inline mr-2 w-5 h-5" />
            Profile
          </button>
        </Link>
      </nav>
    </aside>
  );
}
