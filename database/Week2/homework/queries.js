const db = require('./db');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  


function selectCapital(country){
  let sql = `select City.name
  from new_world.city
  where city.ID = (Select capital from new_world.country where country.name = ? ) `  ;
    sql = db.connection.format(sql, [country]);
    db.executeQuery(sql);
    db.connection.end();
}


function selectLanguages(region) {
 let sql = `Select language 
 from new_world.countrylanguage 
 inner join  new_world.country on  countrycode = code
 where region = ?
 group by language` ;
 sql = db.connection.format(sql, [region]);
 db.executeQuery(sql);
 db.connection.end();

}

function countNumberOfCities(language) {
    let sql = ` select count(1)
    from new_world.countrylanguage
    inner join new_world.country on code = countrycode
    where language = ?`;
    sql = db.connection.format(sql, language);
    db.executeQuery(sql);
    db.connection.end();
}


rl.question('Find the number of cities in which language Z is spoken  ? ', (answer) => {
    countNumberOfCities(answer);  
    rl.close();
  });


rl.question('List all the languages spoken in the region Y ? ', (answer) => {
    selectLanguages(answer);  
    rl.close();
  });


  rl.question('What is the capital of country X ? ', (answer) => {
    selectCapital(answer);  
    rl.close();
  });

