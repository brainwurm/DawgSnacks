'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import personalinfo from "../../../assets/personal_info_pic.jpg"
import { useSession } from "next-auth/react";
import Header from "@/components/ui-elements/Header";

export default function PersonalInfoPage() {
    const { data: session } = useSession();
    const id = (session?.user as any)?.id;
    
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [editFirstName, setEditFirstName] = useState<boolean>(false);
    const [editLastName, setEditLastName] = useState<boolean>(false);
    const [editUsername, setEditUsername] = useState<boolean>(false);
    const [editPassword, setEditPassword] = useState<boolean>(false);
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

    //Gets all the data for initial load of user
    useEffect(() => {
        if (id) {
            const getUserDetails = async () => {
                const response = await fetch(`/api/users/${id}`);
                const data = await response.json();
                setUsername(data.username);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setPassword(data.password);
            }
            getUserDetails();
        }
    }, [id]);

    //Updates user in the database
    const handleSave = async (e: React.FormEvent) => {
        if (!username || !password) {
            alert("Username and password are required fields!");
            return;
        }
        e.preventDefault();
        const user: { username: string; firstName: string; lastName: string; password?: string } = {
            username: username,
            firstName: firstName,
            lastName: lastName,
        };

        if (passwordChanged) {
            user.password = password;
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
      
            if (!response.ok) {
              throw new Error('Network response failed');
            }
            setEditFirstName(false);
            setEditLastName(false);
            setEditUsername(false);
            setEditPassword(false);
            alert("Profile updated successfully");
          } catch (error) {
            console.error("Updated error:", error);
            alert(error instanceof Error ? error.message : "Failed to update profile");
          }
        };

    return(
        <>
            <Header session={session || null} />
            <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157]">
                <div className="flex flex-1">
                    <div className="w-[40%] bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] min-h-[calc(100vh-4rem)] flex items-center justify-center">
                        <div className="relative z-10 ml-5">
                            <Image priority src={personalinfo} alt="paperdoingpaperwork" width={450} height={450} className="object-contain max-w-full max-h-full"></Image>
                        </div>
                    </div>
                    <div className="w-3/5 p-12 bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/WhiteBackground.jpg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '20px' }}>
                        <main className="w-full max-w-md ml-30">
                            <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
                                Hello, Username{username}
                            </h1>
                            <form className="space-y-2" onSubmit={handleSave}>
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                                        First Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        value={firstName} 
                                        onChange={(e) => {setFirstName(e.target.value)}} 
                                        readOnly={!editFirstName}
                                        className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                    />
                                    <button type="button" onClick={() => setEditFirstName(!editFirstName)} className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">
                                        {editFirstName ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                                        Last Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        value={lastName} 
                                        onChange={(e) => {setLastName(e.target.value)}} 
                                        readOnly={!editLastName}
                                        className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                    />
                                    <button type="button" onClick={() => setEditLastName(!editLastName)} className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">
                                        {editLastName ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                                        Username
                                    </label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        value={username} 
                                        onChange={(e) => {setUsername(e.target.value)}} 
                                        readOnly={!editUsername}
                                        className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                    />
                                    <button type="button" onClick={() => setEditUsername(!editUsername)} className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">
                                        {editUsername ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => {
                                            setPasswordChanged(true); 
                                            setPassword(e.target.value);
                                        }} 
                                        readOnly={!editPassword}
                                        className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900"
                                    />
                                    <button type="button" onClick={() => setEditPassword(!editPassword)} className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">
                                        {editPassword ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                                <button type="submit" className="w-full bg-[#4C1B7A] text-white font-semibold py-3 rounded-lg hover:bg-[#3B0270] transition duration-300 mt-6">Save Changes</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
 }