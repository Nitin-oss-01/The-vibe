const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
// Ensure authorization header exists
const authorizationHeader = req.headers['authorization'];

if (!authorizationHeader) {
return res.status(403).json({ error: 'No token provided' });
}

// Extract the token from the header
const token = authorizationHeader.split(' ')[1];  // Assuming the format "Bearer <token>"

if (!token) {
return res.status(403).json({ error: 'Token format is incorrect, missing token' });
}

// Verify the token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
if (err) {
return res.status(401).json({ error: 'Invalid or expired token' });
}
req.user = decoded;  // Attach decoded token to request object
console.log('Token decoded:', decoded);  // Logging the decoded token (for debugging)
next();
});
};

module.exports = authenticateToken;
