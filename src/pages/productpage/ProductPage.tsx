import { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';
import './ProductsPage.css'; // We'll create this CSS file next

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real application, you would fetch this data from an API
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url+'/api/v1/products');
         console.log(url+'/api/v1/products')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])
  if(loading) {
    return (
      <div>
        <h4>Loading.....</h4>
      </div>
    )
  }
  return (
    <div className="products-page-container">
      <h1 className="page-title">Our Products</h1>
      <div className="product-list">
        {products.map((product:any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;