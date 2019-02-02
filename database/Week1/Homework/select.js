const db = require('./db');

db.executeQuery(`use new_world`);
 //What are the names of countries with population greater than 8 million
db.executeQuery(`SELECT Name
                FROM country 
                WHERE population > 8000000;`);

//What are the names of countries that have “land” in their names
db.executeQuery(`SELECT Name
                FROM country 
                WHERE  name LIKE '%land%';`);

// What are the names of the cities with population in between 500,000 and 1 million ?
db.executeQuery(`SELECT Name
                FROM city 
                WHERE Population >= 500000 AND Population <=1000000`);

//What's the name of all the countries on the continent ‘Europe’ ? 
db.executeQuery(`SELECT city.Name
                FROM city 
                JOIN country on city.CountryCode = country.Code
                WHERE Continent = 'Europe'`);

// List all the countries in the descending order of their surface areas.
db.executeQuery(`SELECT *
                FROM country 
                ORDER BY SurfaceArea DESC`);

//  What are the names of all the cities in the Netherlands?
db.executeQuery(`SELECT city.Name
                FROM city
                JOIN country on city.CountryCode = country.Code
                WHERE country.Name = 'Netherlands'`);

//What is the population of Rotterdam ?
db.executeQuery(`SELECT Population
                FROM city
                WHERE Name = 'Rotterdam'`);
//What's the top 10 countries by Surface Area ?
db.executeQuery(`SELECT Name , SurfaceArea
                FROM country 
                ORDER BY SurfaceArea DESC
                LIMIT 10`);
//What's the top 10 most populated cities?
db.executeQuery(`SELECT Name , Population
                FROM city 
                ORDER BY Population DESC
                LIMIT 10`);
//  What is the population of the world ?                
db.executeQuery(`SELECT SUM(Population) as 'Population of the world'
                FROM country `);               

db.connection.end();