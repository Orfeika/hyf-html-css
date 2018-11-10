'use strict';

function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
    let values = [];
    values = createAnArray(startIndex, stopIndex);
    console.log(values);
    for (let i = 0; i<=values.length; i++){
            if(values[i]%3==0){
                threeCallback();
            } 
            if(values[i]%5==0){
                fiveCallback();
            }
    }


  // make array
  // start at beginning of array and check if you should call threeCallback or fiveCallback or go on to next  
}


function createAnArray(startIndex, stopIndex){
    const array = [];
    for (let i = startIndex ; i<=stopIndex; i++){
        array.push(i);
    }
    return array;
}

function sayThree (){
    console.log("I love 3");
}

function sayFive (){
    console.log("I love 5");
}

threeFive(10, 15, sayThree, sayFive);

