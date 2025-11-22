"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    imageUrl: string;
    imageAlt: string;
}

export default function AuthLayout({ children, imageUrl, imageAlt }: AuthLayoutProps) {
    return (
        <div className="bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157]">
            <div className="flex items-center justify-center p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center min-h-screen">
                    {/* Left Side - Image */}
                    <div className="hidden lg:flex justify-start items-center px-8 py-12">
                        <div className="relative overflow-hidden">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="h-auto object-contain max-w-md"
                            />
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex justify-start items-center">
                        <div className="w-full auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
