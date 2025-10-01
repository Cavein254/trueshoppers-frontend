import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/auth"; // your helper
import "./CreateProduct.css";
import { useParams, useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_SERVER_URL;

const CreateProduct: React.FC = () => {
  const [shopId, setShopId] = useState<number>(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryIds, setCategoryIds] = useState<string>(""); // comma separated input
  const [message, setMessage] = useState<string | null>(null);
  const {id} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{
    if(id) {
      setShopId(Number(id));
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      shop_id: shopId,
      name,
      price,
      stock_quantity: stockQuantity,
      description,
      category_ids: categoryIds
        .split(",")
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id)),
    };

    const res = await fetchWithAuth(url + "/api/v1/products/", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.success) {
      setMessage("✅ Product created successfully!");
      // setShopId(0);
      // setName("");
      // setPrice("");
      // setStockQuantity(0);
      // setDescription("");
      // setCategoryIds("");
      const {slug, id} = res.payload;
      return navigate (`/products/${slug}/${id}`)
    } else {
      setMessage("❌ Failed to create product: " + (res.payload?.detail || ""));
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label>Shop ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setShopId(Number(e.target.value))}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </div>
        <div className="form-group">
          <label>Category IDs (comma separated)</label>
          <input
            type="text"
            value={categoryIds}
            onChange={(e) => setCategoryIds(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
