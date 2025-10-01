import { useEffect, useState } from "react";
import { getProductDetails } from "../utils/product";
import { useParams } from "react-router-dom";
import './ProductDetails.css'
import toast from "react-hot-toast";

const ProductDetails = () => {
     const [productDetails, setProductDetails] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const {id} = useParams()
    
        useEffect(()=>{
            async function productDetails() {
                const result = await getProductDetails(Number(id));
        
                if (result.success) {
                    setProductDetails(result.payload);
                } else {
                    setError("Failed to load shops");
                    console.error(result.payload);
                }
        
                setLoading(false);
            }
            productDetails();
          },[])
  const [mainImage, setMainImage] = useState<string | undefined>(
    productDetails?.images.find((img:{ image: string; is_main: boolean }) => img.is_main)?.image || productDetails?.images[0]?.image
  );

  // Update main image when product prop changes
  useEffect(() => {
    if (productDetails) {
      setMainImage(productDetails.images.find((img: { image: string; is_main: boolean }) => img.is_main)?.image || productDetails.images[0]?.image);
    }
  }, [productDetails]);


  if (!productDetails) {
    return (
      <div className="product-details-container no-product">
        <p>Product details not found.</p>
      </div>
    );
  }

  if(loading) {
    return (
      <div>
        <h4>Loading.......</h4>
      </div>
    )
  }

  if (error) {
    return toast.error(error)
  }
  // Fallback image if no images are provided
  const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Product+Image';

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="product-image-gallery">
          <div className="main-image-wrapper">
            <img
              src={mainImage || fallbackImage}
              alt={productDetails.name}
              className="main-product-image"
            />
          </div>
          {productDetails.images.length > 1 && (
            <div className="thumbnail-gallery">
              {productDetails.images.map((image:any) => (
                <img
                  key={image.id}
                  src={image.image} // Using full image for thumbnails for simplicity, can use thumbnail_url if available and different
                  alt={image.alt_text}
                  className={`thumbnail-image ${image.image === mainImage ? 'active' : ''}`}
                  onClick={() => setMainImage(image.image)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{productDetails.name}</h1>
          <p className="product-shop">From: <a href={`/shops/${productDetails.shop_slug}/${productDetails.shop_id}`}>{productDetails.shop}</a></p>
          <p className="product-price">${parseFloat(productDetails.price).toFixed(2)}</p>

          <div className="product-meta">
            <span className="product-sku">SKU: {productDetails.sku}</span>
            <span className={`product-stock ${productDetails.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {productDetails.stock_quantity > 0 ? `In Stock: ${productDetails.stock_quantity}` : 'Out of Stock'}
            </span>
            <span className="product-categories">
              Category: {productDetails.category && productDetails.category.length > 0 ? productDetails.category.join(', ') : 'N/A'}
            </span>
          </div>

          <div className="product-description-full">
            <h3>Description</h3>
            <p>{productDetails.description}</p>
          </div>

          {productDetails.stock_quantity > 0 && (
            <button className="add-to-cart-button">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;