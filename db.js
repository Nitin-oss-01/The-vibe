const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('the_vibe_db', 'root', '', {
host: 'localhost',      
dialect: 'mysql',     
port: 3306,           
logging: false       
});

// Test database connection
async function testConnection() {
try {
await sequelize.authenticate();
console.log(' Database connection has been established successfully.');
} catch (error) {
console.error(' Unable to connect to the database:', error);
}
}

// Run the connection test
testConnection();

module.exports = sequelize;
