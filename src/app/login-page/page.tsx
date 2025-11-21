'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login (no actual auth needed)
    setTimeout(() => {
      router.push('/authenticated-view');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] text-white p-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Link 
            href="/"
            className="mb-8 text-white hover:opacity-80 transition inline-block"
          >
            ← Back
          </Link>

          <div className="bg-[#3B0270] bg-opacity-50 backdrop-blur-sm border border-gray-500 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              <span style={{ color: "#FCD34D", fontFamily: "JejuHallasan" }}>Login</span>
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-[#2D0157] border border-gray-500 rounded text-white placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#2D0157] border border-gray-500 rounded text-white placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#FCD34D] text-[#4C1B7A] font-bold rounded hover:bg-yellow-300 transition mt-6 disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center text-gray-300 mt-6">
              Don't have an account?{' '}
              <Link 
                href="/create-account-page"
                className="text-[#FCD34D] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bubbles */}
      <div className="fixed bottom-0 left-0 -translate-x-3/8 translate-y-3/8 h-90 w-90 rounded-full bg-purple-900 blur-3xl opacity-40 z-[-1]"></div>
      <div className="fixed top-0 right-0 translate-x-1/4 h-80 w-80 rounded-full bg-purple-900 blur-3xl opacity-40 z-[-1]"></div>
    </div>
  );
}
