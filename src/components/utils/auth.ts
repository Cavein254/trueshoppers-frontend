const url = import.meta.env.VITE_SERVER_URL;

export function saveTokens(access:string, refresh:string) {
    localStorage.setItem("shoppers-access", access);
    localStorage.setItem("shoppers-refresh", refresh);
}

export function getAccessToken() {
    return localStorage.getItem("shoppers-access")
}

export function getRefreshToken() {
    return localStorage.getItem("shoppers-refresh")
}

export function clearTokens() {
    localStorage.removeItem("shoppers-access")
    localStorage.removeItem("shoppers-refresh")
}

export async function fetchWithAuth(url:string, options: RequestInit = {}) {
    const token = localStorage.getItem("shoppers-access")

    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization:  `Bearer ${token}`
    }

    const response = await fetch(url, {...options, headers})

    if (response.status == 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            return fetchWithAuth(url, options)
        } else {
            return {
                success:false,
                message:"Unathorized - Please login"
            }
        }
    }

    return {
        success:true,
        payload: response.json()
    }
}

async function refreshAccessToken() {
    const refresh = getRefreshToken();

    if(!refresh) return false;

    try {
        const response = await fetch(url + "/api/v1/auth/token/refresh", {
            method:"POST",
            headers:{"Context-Type":"application/json"},
            body:JSON.stringify({refresh})
        })

        if(!response.ok) return false;

        const data = await response.json()
        localStorage.setItem("shoppers-access", data.access);
        localStorage.setItem("shoppers-refresh", data.refresh);
        return true;
    } catch (err) {
        console.error("Refresh token failed", err);
        return true;
    }
}