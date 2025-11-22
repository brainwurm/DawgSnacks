/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Re-enable NextAuth when backend is ready
// For now, using mock functions for frontend testing

let isAuthenticated = false;

export const auth = async () => {
    if (!isAuthenticated) {
        return null;
    }
    return {
        user: {
            id: "mock-user-123",
            email: "test@example.com",
            name: "Test User"
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
};

export const signIn = async (provider: string, options: any) => {
    console.log("Mock signIn called with:", provider, options);
    isAuthenticated = true;
    return { ok: true };
};

export const signOut = async (options?: any) => {
    console.log("Mock signOut called");
    isAuthenticated = false;
    if (options?.redirectTo) {
        // For server-side redirect
        if (typeof window === "undefined") {
            console.log("Would redirect to:", options.redirectTo);
        }
    }
    return { ok: true };
};

// Mock handlers for API routes
export const handlers = {
    GET: async (req: any) => new Response(JSON.stringify({ message: "Mock GET" })),
    POST: async (req: any) => new Response(JSON.stringify({ message: "Mock POST" }))
};