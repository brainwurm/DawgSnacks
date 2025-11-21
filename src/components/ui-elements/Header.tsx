import React from 'react';

export default function Header() {
  return (
    <header className="border-b border-gray-400">
      <nav className="flex items-center justify-between px-8 py-4 bg-[#4C1B7A]">
        <div className="flex items-center gap-1">
          <img
            src="/DAWG.jpg"
            alt="Dawg Snacks logo"
            className="w-12 h-12 object-cover"
          />
          <h1 className="text-2xl font-serif font-bold tracking-wide text-white">Dawg Snacks</h1>
        </div>
      </nav>
    </header>
  );
}
