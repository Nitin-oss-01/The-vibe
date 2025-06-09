# 🛍️ THE Vibe

**THE Vibe** is a full-stack social media web application designed to empower local shop owners to showcase their products, share their location, and connect with nearby customers. It blends the concept of social platforms like Instagram with practical business visibility, using maps, product cards, and user interaction features.



## 📌 Features

- 🔐 **Authentication System**  
  - User registration and login using JWT.
  - Role-based access control (user/admin).

- 🛒 **Shop Profiles**  
  - Users can create multiple shops.
  - Each shop includes images, products, area, and map location.

- 🗺️ **Google Maps Integration**  
  - Pin-drop and autocomplete-based location picking while adding shops.
  - Shop discovery based on user location and area.

- 🖼️ **Product Posts**  
  - Add, edit, and delete product images and descriptions.
  - View all shop products in a clean, Instagram-like grid.

- 📊 **Dashboard**  
  - Metrics: likes, views, and comments (to be implemented).
  - Manage your shop listings and products in one place.

- 🌍 **Public Home Feed**  
  - View all shops posted by any user.
  - Click through to explore shop profiles and their product posts.

---

## 💻 Tech Stack

### Frontend:
- React.js + Vite
- Bootstrap (for responsive UI)
- React Router
- Axios

### Backend:
- Node.js + Express.js
- MySQL
- JWT Authentication
- Cloudinary (for media storage - optional)
- Redis (for caching - optional)
- Elasticsearch (for advanced search - optional)

### APIs & Libraries:
- Google Maps JavaScript API
- @react-google-maps/api

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- PostgreSQL
- Google Maps API Key
- Cloudinary credentials (if using for images)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your database and JWT secret in .env
npm start
