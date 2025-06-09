import React from "react";
import { Link } from "react-router-dom";



const ShopCard = ({ shop, isOwner, onDelete }) => {
const handleDelete = () => {
if (window.confirm("Are you sure you want to delete this shop?")) {
onDelete(shop._id); // ✅ Ensure correct ID is passed
}
};

const imageUrl =
shop.imageUrl && shop.imageUrl !== "null"
? shop.imageUrl
: "https://placehold.co/500x300";

return (
<div className="card shadow-sm border-0 h-100">
<img
src={imageUrl}
className="card-img-top"
alt={shop.name}
style={{ height: "200px", objectFit: "cover", objectPosition: "center" }}
/>
<div className="card-body">
<h5 className="card-title">{shop.name}</h5>
<p className="card-text">{shop.description}</p>
<span className="badge bg-primary">{shop.area}</span>
</div>
<div className="card-footer text-center">
<Link to={`/shop/${shop._id}`} className="btn btn-outline-primary btn-sm me-2">
View Details
</Link>
{/* {isOwner && (
<>
<Link
to={`/edit-shop/${shop._id}`}
className="btn btn-warning btn-sm me-2"
>
Edit
</Link>
<button onClick={handleDelete} className="btn btn-danger btn-sm">
Delete
</button>
</>
)} */}
</div>
</div>
);
};

export default ShopCard;
