const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER_NAME,
	password: process.env.DB_PASSWORD,
	max: process.env.DB_MAX,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE_NAME
});

module.exports = pool;