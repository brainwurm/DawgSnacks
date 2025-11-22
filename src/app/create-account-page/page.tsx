"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui-elements/Header";
import AuthLayout from "@/components/ui-elements/AuthLayout";

type User = {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export default function CreateAccountPage() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const { data: session } = useSession();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please enter all required fields!");
            return;
        }

        const userData: User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        };

        const url = "/api/users/";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error creating user: ${errorMessage}`);
            }
            setFirstName("");
            setLastName("");
            setUsername("");
            setEmail("");
            setPassword("");
            router.push("/login-page");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Header session={session || null} />
            <AuthLayout imageUrl="/create_account_image.jpg" imageAlt="Create Account">
            <div className="min-h-screen w-full p-8 bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/WhiteBackground.jpg)' }}>
                <div className="w-full max-w-md">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-20
                ">Create Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFirstName(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLastName(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4C1B7A] text-white font-semibold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300 mt-6"
                    >
                        Submit
                    </button>
                </form>
                </div>
            </div>
        </AuthLayout>
        </>
    );
}