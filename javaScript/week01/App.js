console.log("Chiao, mondo!"); // Italian
console.log("Привет, мир!"); // Russian 
console.log("Привіт, світе!");// Ukrainian

var x;
console.log("Yhe value of my x will be underfined " +x);
x = 5; 
console.log(x);
var y = " ";
console.log("Yhe value of my x will be empty space " +y);
y = "I am string"
console.log("Yhe value of my x will be phrase " +y);
var z = 7.25; 
var a = Math.round(z);
console.log("z=" + z + " a="+ a);
var array =[];
console.log(" array="+ array);
array = ["cat", "dog", "elephant"];
console.log(" array="+ array);
array.push("baby pig");
console.log(" array="+ array);
let myString = "this is String";
console.log(myString);
console.log(myString.length);

function isSameType(p1, p2){
    if(typeof(p1)===typeof(p2)){
        console.log('same type');
    } else{
        console.log('different type');

    }
}

var p1= 7; 
var p2= 6; 
var p3 = null;
isSameType(p1 , p3);
var x = 7; 
x = 7%3;
console.log(x);
array = ["cat", "dog", "elephant" ,1 ,2,3];
console.log(" array="+ array);
console.log(6/0===4/0);



