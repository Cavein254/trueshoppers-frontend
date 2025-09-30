import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/auth";

const url = import.meta.env.VITE_SERVER_URL;
export default function Profile() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(()=> {
        async function loadProfile() {
            try {
                const data = await fetchWithAuth(url + "/api/v1/auth/me/");
                setProfile(data)
            } catch (err) {
                console.error(err)
            }
        }
        loadProfile()
    },[])
    if (!profile) return <p>Loading......</p>
    return <div>Welcome {profile.first_name}</div>
}