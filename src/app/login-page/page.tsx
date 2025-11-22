"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui-elements/Header";
import AuthLayout from "@/components/ui-elements/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data);
        setError(data.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "dawgsnacks_user",
          JSON.stringify({
            userId: data.userID,
            name: data.name,
            email: data.email,
          })
        );
      }

      // Login successful -> go to authenticated view
      router.push("/authenticated-view");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header session={session || null} />
      <AuthLayout imageUrl="/login_image.jpg" imageAlt="Login">
        <div
          className="min-h-screen w-full p-8 bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: "url(/WhiteBackground.jpg)" }}
        >
          <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
              Welcome!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Please log in to continue to DawgSnacks.
            </p>

            {error && (
              <div className="mb-4 text-red-600 text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4C1B7A]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4C1B7A]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4C1B7A] text-white font-bold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300 disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="block text-gray-700 font-semibold mb-4">
                Don&apos;t have an account?
              </p>
              <button
                onClick={() => router.push("/create-account-page")}
                className="w-full bg-[#4C1B7A] text-white font-bold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

