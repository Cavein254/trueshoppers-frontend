import { saveTokens } from "./auth";

const url = import.meta.env.VITE_SERVER_URL;

export async function registerUser(userData:any) {
  try {
    const response = await fetch(url +"/api/v1/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    return {
      success:true,
      payload:data
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      success:true,
      payload:error
    }
  }
}


export async function loginUser(userData:any) {
  try {
    const response = await fetch(url +"/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    saveTokens(data.access,data.refresh)
    return {
      success:true,
      payload:data
    }
  } catch (error) {
    return {
      success:false,
      payload:error
    }
  }
}