"use client";

import React, { useState } from "react";
import { doCredentialLogin } from "../auth/authActions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui-elements/Header";
import AuthLayout from "@/components/ui-elements/AuthLayout";

export default function LoginPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);

            const response = await doCredentialLogin(formData);

            if (response?.error) {
                console.error(response.error);
                setError(response.error.message || "An error occurred");
            } else {
                router.push("/authenticated-view");
            }
        } catch (error) {
            console.error(error);
            setError("Incorrect Credentials!");
        }
    }

    return (
        <>
            <Header session={session || null} />
            <AuthLayout imageUrl="/login_image.jpg" imageAlt="Login">
            <div className="min-h-screen w-full p-8 bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/WhiteBackground.jpg)' }}>
                <div className="w-full max-w-md">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Welcome!</h2>
                <p className="text-center text-gray-600 mb-8 text-lg">Sign into your account</p>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4C1B7A] text-white font-semibold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="block text-gray-700 font-semibold mb-4">If you don't have an account?</p>
                    <button
                        onClick={() => router.push("/create-account-page")}
                        className="w-full bg-[#4C1B7A] text-white font-semibold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300"
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