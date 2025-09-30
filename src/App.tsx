import ProductsPage from "./pages/productpage/ProductPage"

import Register from "./components/auth/Register"
import { Routes, Route } from 'react-router-dom';
import Login from "./components/auth/Login";
import ShopList from "./components/shop/ShopList";

function App() {
  return (
    <>
      <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/" element={<ProductsPage />} />
            {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  )
}

export default App
