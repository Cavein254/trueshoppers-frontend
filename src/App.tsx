import ProductsPage from "./pages/productpage/ProductPage"

import Register from "./components/auth/Register"
import { Routes, Route } from 'react-router-dom';
import Login from "./components/auth/Login";
import ShopList from "./components/shop/ShopList";
import ShopDetails from "./components/shop/ShopDetails";
import ProductDetails from "./components/product/ProductDetails";
import About from "./components/about/About";
import { AuthProvider } from "./AuthContext";
import Header from "./components/header/Header";
import CreateShop from "./components/shop/CreateShop";
import MyShops from "./components/shop/MyShops";
import CreateProduct from "./components/product/CreateProduct";

function App() {
  return (
    <>
    <AuthProvider >
      <Header />
      <main>
      <Routes>
            <Route path="/shops/:slug/product/:id" element={<ProductDetails />} />
            <Route path="/shops/:slug/:id" element={<ShopDetails />} />
            <Route path="/myshops" element={<MyShops />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:slug/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-shop" element={<CreateShop />} />
            <Route path="/create-product/:id" element={<CreateProduct />} />
      </Routes>
      </main>
    </AuthProvider>
    </>
  )
}

export default App
