import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import AddProduct from "./pages/AddProduct";
import ShopMapPage from "./pages/ShopMapPage"; // 
import ShopDetail from "./pages/ShopDetail";
import EditShop from "./pages/editshop";




import 'bootstrap/dist/css/bootstrap.min.css'; //  Import Bootstrap CSS here
function App() {
return (
<Router>
<Navbar></Navbar>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/add-product" element={<AddProduct />} />
<Route path="/shop-map" element={<ShopMapPage />} /> {/*  */}
<Route path="/shop/:id" element={<ShopDetail />} />
  <Route path="/edit-shop/:id" element={<EditShop />} />



</Routes>
</Router>
);
}

export default App;
