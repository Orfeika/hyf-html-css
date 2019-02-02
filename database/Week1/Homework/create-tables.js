const db = require('./db');

db.executeQuery("USE world");
db.executeQuery(`CREATE TABLE CITY (
              ID INT,
              NAME VARCHAR(35) NOT NULL,
              CountryCode CHAR(3) NOT NULL,
              District CHAR(20) NOT NULL,
              Population INT(11) NOT NULL, 
              PRIMARY KEY(ID));`);
db.executeQuery(`CREATE TABLE country ( 
                Code CHAR(3) NOT NULL,
                Name CHAR(52) NOT NULL, 
                Continent CHAR(52) NOT NULL,
                Population INT(11) NOT NULL,
                Capital CHAR(52) NOT NULL,
                PRIMARY KEY (Code));`);

db.connection.end();
