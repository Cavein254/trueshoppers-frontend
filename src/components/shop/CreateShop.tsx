import React, { useState } from "react";
import { fetchWithAuth } from "../utils/auth"; // ⬅️ your helper
import "./CreateShop.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreateShop: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (logo) formData.append("logo", logo);
      if (coverImage) formData.append("cover_image", coverImage);

      const res = await fetchWithAuth(`${API_URL}/api/v1/shops/`, {
        method: "POST",
        body: formData,
      });

      if (!res.success) {
        return toast.error(JSON.stringify(res.payload))
      } else {
        setSuccess(true);
        const {slug, id} = res.payload;
        return navigate(`/shops/${slug}/${id}`)
      }
    } catch (err) {
      console.error("Error creating shop:", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-shop-container">
      <h2>Create a New Shop</h2>
      <form onSubmit={handleSubmit} className="create-shop-form">
        <div className="form-group">
          <label htmlFor="name">Shop Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter shop name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Write something about your shop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>

        <button type="submit" className="create-shop-button" disabled={loading}>
          {loading ? "Creating..." : "Create Shop"}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Shop created successfully!</p>}
      </form>
    </div>
  );
};

export default CreateShop;
