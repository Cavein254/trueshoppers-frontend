const url = import.meta.env.VITE_SERVER_URL;

export const getShops = async () => {
    console.log("calling shops")
    try {
        const response = await fetch(url +"/api/v1/shops/", {
          method: "GET",
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        }
    
        const data = await response.json();
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