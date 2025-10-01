const url = import.meta.env.VITE_SERVER_URL;

export const getProductDetails = async (id:string) => {
    if(!id) return {
        success:false,
        message:"No product found!"
    }
    try {
        const response = await fetch(url +`/api/v1/products/${id}`, {
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
