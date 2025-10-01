const url = import.meta.env.VITE_SERVER_URL;

export const getShops = async () => {
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



export const getMyShops = async () => {
    try {
        const response = await fetch(url +"/api/v1/myshops/", {
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

export const getShopDetails = async (id:string | undefined) => {
  if (!id) return {
    success:false,
    message:"shop does not exist"
  }
    try {
        const response = await fetch(url +`/api/v1/shop-details/${id}`, {
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