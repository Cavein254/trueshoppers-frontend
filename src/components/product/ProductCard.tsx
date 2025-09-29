import './ProductCard.css'; 


const url = import.meta.env.VITE_SERVER_URL;
const ProductCard = ({ product }:{product:any}) => {
  const randomNum = Math.floor(Math.random() * 10000) + 1;
  const logo_url = `https://picsum.photos/200/200?random=${randomNum}`;
  const mainImage = product.images.find(image => image.is_main) || product.images[0];
  const imageUrl = mainImage ? url + mainImage.thumbnail_url : logo_url; // Placeholder if no image

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-shop">Shop: {product.shop}</p>
        <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
        <p className="product-stock">Stock: {product.stock_quantity}</p>
        {product.category && product.category.length > 0 && (
          <p className="product-category">Category: {product.category.join(', ')}</p>
        )}
        {product.description && (
          <p className="product-description">{product.description.substring(0, 100)}...</p>
        )}
        <button className="add-to-cart-button">View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;