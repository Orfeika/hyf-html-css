
const db = require('./db');

db.executeQuery("DROP SCHEMA IF EXISTS world;");
db.executeQuery("CREATE SCHEMA world;")
db.connection.end();
