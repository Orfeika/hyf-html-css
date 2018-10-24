"use strict";

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

function Book(author, title, language, cover) {
  this.author = author;
  this.title = title;
  this.language = language;
  this.cover = cover; 
} 





let booksList = ['EatPrayLove', 'TheLittlePrince' , 
				'TheGreatGatsby' , 'Fahrenheit451',
				'PrideAndPrejudice','ToKillAMockingbird ',
				'AllQuietOnTheWesternFront', 'WarAndPeace',
				'TheCatcherInTheRye','TheHitchhikersGuideToTheGalaxy',
				'ASongOfIceandFire'];


let bookObjectList = [new Book ("Elizabeth Gilber","Eat Pray Love ","English" ,"covers/EatPrayLove.jpg" ) , 
					new Book("Antoine de Saint-Exupéry","The Little Prince", "English","covers/TheLittlePrince.jpg" ),
					new Book("F.Scott Fitzgerald","The Great Gatsby","English", "covers/TheGreatGatsby.jpg"),
					new Book("Ray Bradbury"," Fahrenheit 451","English", "covers/Fahrenheit451.jpg"),
					new Book("Jane Austen","Pride and Prejudice", "English", "covers/PrideAndPrejudice.jpg"),
					new Book("Harper Lee","To Kill a Mockingbird", "English","covers/ToKillAMockingbird.jpg"),
					new Book ("Erich Marie Remarque","All Quiet on the Western Front","English","covers/AllQuietOnTheWesternFront.jpg"),
					new Book("Leo Tolstoy","War and Peace","English", "covers/WarAndPeace.jpg"),
					new Book("J.D. Salinger","The Catcher in the Rye ","English", "covers/TheCatcherInTheRye.jpg"),
					new Book("Douglas Adams","The Hitchhiker's Guide to the Galaxy Douglas","English","covers/TheHitchhikersGuideToTheGalaxy.jpg"),
					new Book( "George R. R. Martin" ,"A Song of Ice and Fire","English","covers/ASongOfIceandFire.jpg")];

 
function generateElements(){
        let ul = document.createElement('ul');
		 ul.setAttribute('id','booksList');
	 document.getElementById('bookShelf').appendChild(ul);
	 booksList.forEach(renderBookList);
	 bookObjectList.forEach(createBooks);


	  function renderBookList(element, index, array){
	 	let li  = document.createElement('li');
		li.setAttribute('class','book');
		 ul.appendChild(li);
		li.setAttribute('id', element);
	 }

	 function createBooks(element, index, array){
		 let liList = document.getElementsByClassName("book");
		 let div = document.createElement('div');
		 div.setAttribute('class' , 'books');
		 let divBookTitle = document.createElement('div');
		 divBookTitle.setAttribute('class', 'title')
		 let p = document.createElement('p');
		 let img = document.createElement('img');
		 img.setAttribute('src',element.cover);
		 let mainDiv= liList[index].appendChild(div);
		 mainDiv.appendChild(divBookTitle).appendChild(p);
		 mainDiv.append(img);	
		 p.innerHTML =p.innerHTML + " " +element.author + " " + element.title ;
	 }





}



