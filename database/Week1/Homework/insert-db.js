
const db = require('./db');
db.executeQuery("USE world");
let countries = [
[ 'ABW','Aruba','North America', 103000,'Beatrix'],
['AFG','Afghanistan','Asia',22720000,'Afganistan/Afqanestan'],
['AGO','Angola','Africa',246700.00,'Angola'],
['AIA','Anguilla','North America',8000,'Anguilla'],
['ALB','Albania','Europe',3401200, 'Shqipria'],
['AND','Andorra','Europe',78000,'Andorra'],
['ANT','Netherlands Antilles','North America',217000,'Nederlandse Antillen'],
['ARE','United Arab Emirates','Asia',2441000,'Al-Imarat al-Arabiya al-Muttahida'],
['ARG','Argentina','South America',37032000,'Argentina'],
['ARM','Armenia','Asia',3520000,'Hajastan']
];

let cities = [
 [54,'Fagatogo','ASM','Tutuila',2323],
 [56,'Luanda','AGO','Luanda',2022000],
 [57,'Huambo','AGO','Huambo',163100],
 [58,'Lobito','AGO','Benguela',130000],
 [59,'Benguela','AGO','Benguela',128300],
 [60,'Namibe','AGO','Namibe',118200],
 [64,'Dubai','ARE','Dubai',669181],
 [65,'Abu Dhabi','ARE','Abu Dhabi',398695],
 [66,'Sharja','ARE','Sharja',320095],
 [67,'al-Ayn','ARE','Abu Dhabi',225970],
 [68,'Ajman','ARE','Ajman',114395],
 [69,'Buenos Aires','ARG','Distrito Federal',2982146]
];

db.insertValuesToTable('CITY', cities);
db.insertValuesToTable('COUNTRY',countries);
db.connection.end();
