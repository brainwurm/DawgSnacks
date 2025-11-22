export const authConfig = {
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/login-page",
        newUser: "/create-account-page",
    },
    providers: [],
};