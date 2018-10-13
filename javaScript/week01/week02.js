const myObj = {
  prop2:"Hello", 
  prop1 : 1
};
const prop1 = "Hola";
console.log(prop1);
console.log(myObj.prop2);
myObj.prop3 = "Hej!";
myObj.prop4 = undefined; 
console.log(myObj.prop2);
console.log(myObj.prop4);
console.log(myObj["prop3"]);
console.log(myObj);
console.log(Object.keys(myObj));
let myObj2= myObj;
myObj2.prop2 = "Salut";
console.log(myObj);
console.log(myObj2.prop2);

const myArray = [
"Hello",

"Hej", 
"Hallo"
];
var val = myArray.pop();
//console.log(val);
//console.log(myArray);

for(let country in myArray){
    console.log(myArray[country]);
}