/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { signIn, signOut } from "../../auth";
import { redirect } from "next/navigation";

export async function doLogout() {
    await signOut({redirectTo: "/"});
    redirect("/");
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        return response;
    } catch (err) {
        throw err;
    }
}