
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export const signupUser = async (email, password) => {
try {
const response = await axios.post(`${API_URL}/signup`, { email, password });
return response.data;
} catch (error) {
console.error("Signup error:", error.response?.data || error.message);
throw error;
}
};

export const loginUser = async (email, password) => {
try {
const response = await axios.post(`${API_URL}/auth/login`, { email, password });
localStorage.setItem('token', response.data.token);
return response.data;
} catch (error) {
console.error("Login error:", error.response?.data || error.message);
throw error;
}
};



export const fetchAllShops = async () => {
try {
const response = await axios.get(`${API_URL}/shops`);
return response.data;
} catch (err) {
console.error("Error fetching all shops:", err.response?.data || err.message);
return [];
}
};

export const fetchShops = async () => {
try {
const token = localStorage.getItem('token');
if (!token) throw new Error("No token found. Please log in.");

const response = await axios.get(`${API_URL}/shops/my`, {
headers: {
  'Authorization': `Bearer ${token}`,
},
});

return response.data;
} catch (err) {
console.error("Error fetching user shops:", err.response?.data || err.message);
return [];
}
};

export const createShop = async (shopData) => {
try {
const token = localStorage.getItem('token');
if (!token) throw new Error("No token found. Please log in.");

const response = await axios.post(`${API_URL}/shops`, shopData, {
headers: {
  'Authorization': `Bearer ${token}`,
},
});

return response.data;
} catch (err) {
console.error("Error creating shop:", err.response?.data || err.message);
throw err;
}
};

export const updateShop = async (shopId, updatedData) => {
try {
const token = localStorage.getItem('token');
if (!token) throw new Error("No token found. Please log in.");

const response = await axios.put(`${API_URL}/shops/${shopId}`, updatedData, {
headers: {
  'Authorization': `Bearer ${token}`,
},
});

return response.data;
} catch (err) {
console.error("Error updating shop:", err.response?.data || err.message);
throw err;
}
};
export const deleteShop = async (shopId) => {
try {
const token = localStorage.getItem('token');
if (!token) throw new Error("No token found. Please log in.");

const response = await axios.delete(`${API_URL}/shops/${shopId}`, {
headers: {
  'Authorization': `Bearer ${token}`,
},
});

return response.data;
} catch (err) {
console.error("Error deleting shop:", err.response?.data || err.message);
throw err;
}
};


// Create a new product
export const createProduct = async (productData) => {
try {
const token = localStorage.getItem('token');
if (!token) throw new Error("No token found. Please log in.");

const response = await axios.post(`${API_URL}/products`, productData, {
headers: {
  'Authorization': `Bearer ${token}`,
},
});

return response.data;
} catch (err) {
console.error("Error creating product:", err.response?.data || err.message);
throw err;
}
};
