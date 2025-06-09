// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
const [searchQuery, setSearchQuery] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();

useEffect(() => {
const token = localStorage.getItem("token");
setIsLoggedIn(!!token); // true if token exists
}, []);

const handleSearch = (e) => {
e.preventDefault();
console.log("Searching for:", searchQuery);
// Add search logic here
};

const handleProfileClick = (e) => {
if (!isLoggedIn) {
e.preventDefault();
alert("Please log in to view your profile.");
navigate("/login");
} else {
navigate("/profile");
}
};

const handleLogout = () => {
localStorage.removeItem("token");
setIsLoggedIn(false);
navigate("/login");
};

return (
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
<div className="container">
<Link className="navbar-brand fs-3 fw-bold" to="/">THE Vibe</Link>
<button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
>
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav ms-auto">
<li className="nav-item">
<Link className="nav-link" to="/">Home</Link>
</li>

{/* <li className="nav-item">
<Link className="nav-link" to="/about">About</Link>
</li> */}

<li className="nav-item">
<a className="nav-link" href="#" onClick={handleProfileClick}>Profile</a>
</li>

{!isLoggedIn ? (
<>
  <li className="nav-item">
    <Link className="nav-link" to="/login">Log In</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/signup">Sign Up</Link>
  </li>
</>
) : (
<li className="nav-item">
  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
</li>
)}
</ul>

{/* Search by Area Section */}
<form className="d-flex ms-3" onSubmit={handleSearch}>
<input
className="form-control me-2"
type="search"
placeholder="Search by area"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<button className="btn btn-outline-primary" type="submit">Search</button>
</form>
</div>
</div>
</nav>
);
};

export default Navbar;
