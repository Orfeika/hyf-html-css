
'use strict'; 
const numbers = [1, 2, 3, 4];
const newNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) {
    newNumbers.push(numbers[i] * 2);
  }
}

console.log('The doubled numbers are', newNumbers); // ==> [2, 6]
let nNumber = numbers.filter(x=>x%2!==0);
nNumber = nNumber.map(x=>x*2);
console.log('The doubled numbers are', nNumber);

const monday = [
  {
    name: 'Write a summary HTML/CSS',
    duration: 180
  },
  {
    name: 'Some web development',
    duration: 120
  },
  {
    name: 'Fix homework for class10',
    duration: 20
  },
  {
    name: 'Talk to a lot of people',
    duration: 200
  }
];

const tuesday = [
  {
    name: 'Keep writing summary',
    duration: 240
  },
  {
    name: 'Some more web development',
    duration: 180
  },
  {
    name: 'Staring out the window',
    duration: 10
  },
  {
    name: 'Talk to a lot of people',
    duration: 200
  },
  {
    name: 'Look at application assignments new students',
    duration: 40
  }
];

const tasks = monday.concat(tuesday);

let workTimeHours  = tasks.map(obj => obj.duration/60);
workTimeHours = workTimeHours.filter(duration => duration >=2 );
let totalPayment =workTimeHours.map(bill =>  +(bill*50).toFixed(2)  );
totalPayment = totalPayment.reduce((a , b )=>a+b,0).toFixed(2);
console.log("\u20ac" +" " + totalPayment);


