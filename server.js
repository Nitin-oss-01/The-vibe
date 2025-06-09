const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const ShopRoutes = require("./Routes/ShopRoutes");  
const userRoutes = require("./Routes/userRoutes");  
const productRoutes = require("./Routes/productRoutes");


const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log(" JWT_SECRET loaded as:", process.env.JWT_SECRET);

const app = express();
app.use(cors());
app.use(bodyParser.json());  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);  
app.use("/api/shops", ShopRoutes);  
app.use("/api/users", userRoutes); 
app.use("/api/products", productRoutes);


// Database sync
sequelize.sync().then(() => {
  console.log("Database synced!");
}).catch((err) => {
  console.error("Database sync error:", err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
