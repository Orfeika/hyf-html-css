
const db = require('./db');

db.executeQuery("CREATE SCHEMA IF NOT EXISTS world;");
db.connection.end();
