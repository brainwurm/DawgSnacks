/* Mock auth so we can focus on MongoDB.
   This satisfies imports from authActions.ts and Header.tsx. */

let isAuthenticated = false;

export const auth = async () => {
  if (!isAuthenticated) return null;

  return {
    user: {
      id: "mock-user-123",
      email: "test@example.com",
      name: "Test User",
    },
  };
};

export const signIn = async (provider: string, options: any) => {
  console.log("Mock signIn called with:", provider, options);
  isAuthenticated = true;
  return { ok: true };
};

export const signOut = async (options?: any) => {
  console.log("Mock signOut called:", options);
  isAuthenticated = false;
  return { ok: true };
};

export const handlers = {
  GET: async () =>
    new Response(JSON.stringify({ message: "Mock GET" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  POST: async () =>
    new Response(JSON.stringify({ message: "Mock POST" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
};

