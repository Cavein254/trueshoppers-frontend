import { useEffect, useState } from 'react';
import './ShopList.css'; // Import the CSS file
import { fetchWithAuth } from '../utils/auth';

const url = import.meta.env.VITE_SERVER_URL;
const MyShops = () => {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
  useEffect(()=>{
    async function allShops() {
        const result = await fetchWithAuth(url+"/api/v1/myshops/");

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
        return (
            <div>
                <p className="no-shops">No shops available.</p>
                <a href="/create-shop" className="shop-details-link">Create Shop</a>
            </div>
        )
    }

    const shopItems = shops.map((shop) => {
        const randomNum = Math.floor(Math.random() * 10000) + 1;
        return (
          <div key={shop.id} className="shop-card">
            <div className="shop-cover-image-wrapper">
              <img
                src={shop.cover_image || `https://picsum.photos/400/400?random=${randomNum}`}
                alt={`${shop.name} cover`}
                className="shop-cover-image"
              />
            </div>
            <div className="shop-logo-wrapper">
              <img
                src={shop.logo || `https://picsum.photos/200/200?random=${randomNum}`}
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
              <a href={`/shops/${shop.slug}/${shop.id}`} className="shop-details-link">
                View Details
              </a>
            </div>
          </div>
        )
    })

  return (
    <div className="shop-list-container">
      <h2 className="shop-list-title">Our Shops ({shops.length})</h2>
      <div className="shop-cards-grid">
        {shopItems}
      </div>
    </div>
  );
};

export default MyShops;