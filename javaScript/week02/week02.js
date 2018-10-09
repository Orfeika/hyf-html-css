let myString = "hello,this,is,a,difficult,to,read,sentence";
console.log(myString);
console.log("Lenght : " + myString.length);
let find = ",";
let re = new RegExp(find, 'g');
let newString = myString.replace(re, ' ');
console.log(newString);

// Arrays

let favoriteAnimals = ['blowfish', 'capricorn', 'giraffe'];
favoriteAnimals.push("turtle");
console.log(favoriteAnimals);
favoriteAnimals.splice(1,0,'meerkat');
console.log("The new array is 'blowfish', 'meerkat', 'capricorn', 'giraffe', 'turtle'")
console.log(favoriteAnimals);
console.log( 'The array has a length of: '  + favoriteAnimals.length);
function removeElement(array, key){
   let index = array.indexOf(key);
   console.log("The item you are looking for is at index " + index);
   array.splice(index,1);
}

removeElement(favoriteAnimals, "giraffe");
console.log(favoriteAnimals);

removeElement(favoriteAnimals, "meerkat");
console.log(favoriteAnimals);


// Sum of arguments 

function sumElemens(elem1, elem2, elem3){
    return elem1+elem2+elem3;
}

console.log(sumElemens(1,2,3));

// color function 

function colorACat(color){
    return "Cat has " + color + " color";
}

console.log(colorACat("black"));

let someObject = {
    Age:15,
    Name: "Name"
};

function printAll(object){ 
    for(let propertyName in object){
        console.log( propertyName + ":" + object[propertyName]);
    }
}

printAll(someObject);

//vehicles type

function vehiclesType(color, type){
    let vehiclesName = "";
    if(type == 1){
        vehiclesName = "car";

    } else if(type == 2){
        vehiclesName = "motorbike";
    } else {
        vehiclesName = "unknown vehicle"; 
    }

    console.log( "a " + color + " " + vehiclesName);
}

vehiclesType("red", 2);


// 5. 

console.log(3===3?"yes":"no");

//6. Vehicle

function vehicle(color, type, age){
    let vehiclesName = "";
    if(type == 1){
        vehiclesName = "car";

    } else if(type == 2){
        vehiclesName = "motorbike";
    } else {
        vehiclesName = "unknown vehicle"; 
    }

    let vehicleAge = age==0?"new":"used"; 

    console.log( "a " + color + " " + vehicleAge  + " "+ vehiclesName);
}

vehicle("green", 1 , 0);
  

//7. 

let vehicles = ["motorbike","caravan", "bike"];
//8.
console.log(vehicles[2]);

//16. 
let o1 = { foo: 'bar' };
let o2 = { foo: 'bar' };
let o3 = o2;
o2["foo"] =  "newBar"; 
console.log("o1: " + o1['foo'] +
 " o2: " + o2['foo'] + " o3: " + o3['foo'] );



//17. It would be string, because the first tipeof return "number"
let bar = 42; 
console.log(typeof typeof bar);
