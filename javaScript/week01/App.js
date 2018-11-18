console.log("Chiao, mondo!"); // Italian
console.log("Привет, мир!"); // Russian 
console.log("Привіт, світе!");// Ukrainian

//2 
console.log("I'm awesome");
//3
var x;
console.log("The value of my x will be underfined " +x);
x = 5; 
console.log(x);

// 4
var y = " ";
console.log("The value of my x will be empty space " +y);
y = "I am string"
console.log("The value of my x will be phrase " +y);
//5
var z = 7.25; 
var y = x>z?x:z;
console.log ("y = " + y);
var a = Math.round(z);
console.log("z=" + z + " a="+ a);
//6
var array =[];
console.log(" array="+ array);
array = ["cat", "dog", "elephant"];
console.log(" array="+ array);
array.push("baby pig");
console.log(" array="+ array);

//7
let myString = "this is String";
console.log(myString);
console.log(myString.length);

//8
var p1= 7; 
var p2= 6; 
var p3 = true;
var p4 = "dd";
console.log("p1: " + p1 + "\np2: " + p2 + "\np3: " + p3 + "\np4: " + p4  )
console.log("Values for p1 amd p2 - number , value for  p3 - boolean and value for p4 - String " )
function isSameType(p1, p2){
    if(typeof(p1)===typeof(p2)){
        console.log('same type');
    } else{
        console.log('different type');

    }
}
isSameType(p1 , p3);
isSameType(p1 , p2);
isSameType(p3,p4);
//9
var x = 7; 
x = 7%3;
console.log("new value of x is 1");
console.log(x);
//10
array = ["cat", "dog", "elephant" ,1 ,2,3];
console.log(" array="+ array);
console.log("Infinites are equal");
console.log(6/0===4/0);



