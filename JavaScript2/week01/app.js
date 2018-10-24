"use strict";
let booksList = ['EatPrayLove', 'TheLittlePrince' , 
				'TheGreatGatsby' , 'Fahrenheit451',
				'PrideAndPrejudice','ToKillAMockingbird ',
				'AllQuietOnTheWesternFront', 'WarAndPeace',
				'TheCatcherInTheRye','TheHitchhikersGuideToTheGalaxy',
				'ASongOfIceandFire'];

//Eat Pray Love by Elizabeth Gilber
//The Little Prince by Antoine de Saint-Exupéry
// Fahrenheit 451 by Ray Bradbury
//Pride and Prejudice by Jane Austen
//To Kill a Mockingbird by Harper Lee
//All Quiet on the Western Front by Erich Marie Remarque
//War and Peace by Leo Tolstoy
//The Catcher in the Rye by J.D. Salinger
//The Hitchhiker's Guide to the Galaxy Douglas Adams
//	A Song of Ice and Fire George R. R. Martin

function Book(author, title, language) {
  this.author = author;
  this.title = title;
  this.language = language;
} 






let aSongOfIceandFire = {
author: "George R. R. Martin" ,
title:"A Song of Ice and Fire",
language:"English"

};

let theHitchhikersGuideToTheGalaxy = {
author:"Douglas Adams",
title:"The Hitchhiker's Guide to the Galaxy Douglas",
language: "English"

};

let theCatcherInTheRye = {
author:"J.D. Salinger",
title:"The Catcher in the Rye ",
language: "English"

};

let warAndPeace = {
author:"Leo Tolstoy",
title:"War and Peace",
language: "English"

};


let allQuietOnTheWesternFront = {
author:"Erich Marie Remarque",
title:"All Quiet on the Western Front",
language: "English"
};

let toKillAMockingbird = {
author:"Harper Lee",
title:"To Kill a Mockingbird",
language: "English"
};

let prideAndPrejudice = {
author:"Jane Austen",
title:"Pride and Prejudice",
language: "English"
};

let fahrenheit451 = {
author:"by Ray Bradbury",
title:" Fahrenheit 451",
language:"English"
};

let theGreatGatsby = {
author:"F.Scott Fitzgerald",
title:"The Great Gatsby",
language: "English"
};


let theLittlePrince = {
author:"Antoine de Saint-Exupéry",
title:"The Little Prince",
language: "English"
};

let eatPrayLove = {
author:"Elizabeth Gilber",
title:"Eat Pray Love ",
language: "English"
};


let bookObjectList = [new Book( "George R. R. Martin" ,
								"A Song of Ice and Fire",
								"English"), 
					new Book("Douglas Adams",
							"The Hitchhiker's Guide to the Galaxy Douglas",
							"English"),
					theGreatGatsby, fahrenheit451, 
					prideAndPrejudice, toKillAMockingbird, 
					allQuietOnTheWesternFront,warAndPeace,
					theCatcherInTheRye, theHitchhikersGuideToTheGalaxy,
					aSongOfIceandFire];


function generateElements(){
        let ul = document.createElement('ul');
		 ul.setAttribute('id','booksList');
	 document.getElementById('bookShelf').appendChild(ul);
	 booksList.forEach(renderBookList);

	  function renderBookList(element, index, array){
	 	let li  = document.createElement('li');
		li.setAttribute('class','book');
		 ul.appendChild(li);
		li.setAttribute('id', element);
		
	 }


}



