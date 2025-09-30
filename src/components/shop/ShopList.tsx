import { useEffect, useState } from 'react';
import { getShops } from '../utils/shop';
import './ShopList.css'; // Import the CSS file


const ShopList = () => {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
  useEffect(()=>{
    async function allShops() {
        const result = await getShops();

        if (result.success) {
            setShops(result.payload);
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

    if (shops.length === 0) {
        return <p className="no-shops">No shops available.</p>;
    }


  return (
    <div className="shop-list-container">
      <h2 className="shop-list-title">Our Shops ({shops.length})</h2>
      <div className="shop-cards-grid">
        {shops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <div className="shop-cover-image-wrapper">
              <img
                src={shop.cover_image || 'https://via.placeholder.com/400x200?text=No+Cover'}
                alt={`${shop.name} cover`}
                className="shop-cover-image"
              />
            </div>
            <div className="shop-logo-wrapper">
              <img
                src={shop.logo || 'https://via.placeholder.com/80?text=No+Logo'}
                alt={`${shop.name} logo`}
                className="shop-logo"
              />
            </div>
            <div className="shop-info">
              <h3 className="shop-name">{shop.name}</h3>
              <p className="shop-description">
                {shop.description.length > 100
                  ? shop.description.substring(0, 100) + '...'
                  : shop.description}
              </p>
              <a href={`/shops/${shop.slug}`} className="shop-details-link">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopList;