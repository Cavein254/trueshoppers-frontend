import { useEffect, useState } from 'react';
import './ShopDetails.css'; // Import the CSS file
import { getShopDetails } from '../utils/shop';
import { useParams } from "react-router-dom"

const ShopDetails = () => {
    const [shopDetails, setShopDetails] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const {id} = useParams()
     
      useEffect(()=>{
        async function allShops() {
            const result = await getShopDetails(id);
    
            if (result.success) {
                setShopDetails(result.payload);
            } else {
                setError("Failed to load shops");
                console.error(result.payload);
            }
    
            setLoading(false);
        }
        allShops();
      },[])
  if (loading) {
        return <p>Loading shops...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (shopDetails.length === 0) {
        return <p className="shop-details-not-found">Shop details not found.</p>;
    }

  // Helper to get the main product image
  const getMainProductImage = (images:any) => {
    const mainImage = images.find((img: { image: string; is_main: boolean }) => img.is_main);
    return mainImage ? mainImage.image : (images.length > 0 ? images[0].image : 'https://via.placeholder.com/150?text=No+Image');
  };

  return (
    <div className="shop-details-page-container">
      {/* Shop Header Section */}
      <div className="shop-header">
        <div className="shop-cover-banner" style={{ backgroundImage: `url(${shopDetails.cover_image || 'https://via.placeholder.com/1200x300?text=Shop+Cover'})` }}>
          <div className="shop-logo-overlay">
            <img
              src={shopDetails.logo || 'https://via.placeholder.com/120?text=Shop+Logo'}
              alt={`${shopDetails.name} logo`}
              className="shop-logo-large"
            />
          </div>
        </div>
        <div className="shop-header-info">
          <h1 className="shop-details-name">{shopDetails.name}</h1>
          <p className="shop-details-description">{shopDetails.description}</p>
          <div className="shop-meta">
            <span>Slug: {shopDetails.slug}</span>
            <span>Created: {new Date(shopDetails.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="shop-products-section">
        <h2 className="products-section-title">Products from {shopDetails.name} ({shopDetails.products ? shopDetails.products.length : 0})</h2>

        {shopDetails.products && shopDetails.products.length > 0 ? (
          <div className="product-cards-grid">
            {shopDetails.products.map((product:any) => (
              <div key={product.id} className="product-card">
                <img
                  src={getMainProductImage(product.images)}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                  <p className="product-stock">In Stock: {product.stock_quantity}</p>
                  <p className="product-category">
                    Category: {product.category && product.category.length > 0 ? product.category.join(', ') : 'N/A'}
                  </p>
                  <p className="product-description">
                    {product.description.length > 80
                      ? product.description.substring(0, 80) + '...'
                      : product.description}
                  </p>
                  <a href={`/products/${product.slug}/${product.id}`} className="product-details-link">
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-products-wrapper'>
            <div className="">
            <p className="no-products">This shop currently has no products.</p>
            </div>
             <div className="">
              <a href={`/create-product/${shopDetails.id}`} className="product-details-link">
                    Add Product
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;