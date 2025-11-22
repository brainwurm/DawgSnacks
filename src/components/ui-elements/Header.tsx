"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doLogout } from "@/app/auth/authActions";
import { Session } from "next-auth";

interface HeaderProps {
    session: Session | null;
}

export default function Header({ session }: HeaderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
    }, [session]);

    const handleLogout = async () => {
        await doLogout();
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <nav className="bg-[#4C1B7A] border-b border-gray-400 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
                {/* Logo and Name */}
                <div className="flex items-center space-x-4">
                    <Link href={isLoggedIn ? "/authenticated-view" : "/"}>
                        <img
                            src="/DAWG.jpg"
                            alt="Dawg Snacks Logo"
                            className="h-12 w-12 sm:h-16 sm:w-16 object-cover"
                        />
                    </Link>
                    <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white">Dawg Snacks</h1>
                </div>

                {/* Login/Logout Buttons */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn && session?.user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm sm:text-lg text-white">
                                Welcome, {session.user?.name || session.user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 border-2 border-white rounded-full bg-white text-purple-900 px-4 py-2 hover:bg-gray-100 transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                    fill="currentColor"
                                >
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                                </svg>
                                <span className="cursor-pointer text-sm sm:text-lg">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-8">
                            <span
                                className="text-sm sm:text-lg text-white hover:opacity-80 cursor-pointer transition"
                                onClick={() => router.push("/create-account-page")}
                            >
                                Create Account
                            </span>
                            <button
                                onClick={() => router.push("/login-page")}
                                className="flex items-center space-x-2 border-2 border-white rounded-full bg-white text-purple-900 px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
                            >
                                <span className="text-sm sm:text-lg font-semibold">Login</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
