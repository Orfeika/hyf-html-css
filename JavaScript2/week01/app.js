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

function Book(id, author, title, language, cover) {
  this.id = id; 		
  this.author = author;
  this.title = title;
  this.language = language;
  this.cover = cover; 
} 








let bookObjectList = [new Book ('EatPrayLove',"Elizabeth Gilber","Eat Pray Love ","English" ,"covers/EatPrayLove.jpg" ) , 
					new Book('TheLittlePrince' ,"Antoine de Saint-Exupéry","The Little Prince", "English","covers/TheLittlePrince.jpg" ),
					new Book('TheGreatGatsby',"F.Scott Fitzgerald","The Great Gatsby","English", "covers/TheGreatGatsby.jpg"),
					new Book('Fahrenheit451',"Ray Bradbury"," Fahrenheit 451","English", "covers/Fahrenheit451.jpg"),
					new Book('PrideAndPrejudice',"Jane Austen","Pride and Prejudice", "English", "covers/PrideAndPrejudice.jpg"),
					new Book('ToKillAMockingbird ',"Harper Lee","To Kill a Mockingbird", "English","covers/ToKillAMockingbird.jpg"),
					new Book ('AllQuietOnTheWesternFront',"Erich Marie Remarque","All Quiet on the Western Front","English","covers/AllQuietOnTheWesternFront.jpg"),
					new Book('WarAndPeace',"Leo Tolstoy","War and Peace","English", "covers/WarAndPeace.jpg"),
					new Book('TheCatcherInTheRye',"J.D. Salinger","The Catcher in the Rye ","English", "covers/TheCatcherInTheRye.jpg"),
					new Book('TheHitchhikersGuideToTheGalaxy',"Douglas Adams","The Hitchhiker's Guide to the Galaxy Douglas","English","covers/TheHitchhikersGuideToTheGalaxy.jpg"),
					new Book('ASongOfIceandFire', "George R. R. Martin" ,"A Song of Ice and Fire","English","covers/ASongOfIceandFire.jpg")];

 
function generateElements(){
        let ul = document.createElement('ul');
		 ul.setAttribute('id','booksList');
	 document.getElementById('bookShelf').appendChild(ul);
	 // booksList.forEach(renderBookList);
	 bookObjectList.forEach(createBooks);
	 bookObjectList.forEach(addText);


	  function renderBookList(element, index, array){
	 	let li  = document.createElement('li');
		li.setAttribute('class','list');
		 ul.appendChild(li);
		li.setAttribute('id', element);
	 }

	 function createBooks(element, index, array){
	 	 let li  = document.createElement('li');
		 ul.appendChild(li);
		 li.setAttribute('id', element.id);
		 let div = document.createElement('div');
		 div.setAttribute('class' , 'book-bg');
		 let divBookTitle = document.createElement('div');
		 divBookTitle.setAttribute('class', 'book-cover');
		 let p = document.createElement('p');
		 let img = document.createElement('img');
		 img.setAttribute('src',element.cover);
		 li.appendChild(div).appendChild(divBookTitle).appendChild(img);
		 div.appendChild(p);
		
	 }

	 function addText(element, index, array){
	 	let pList = document.getElementsByTagName('p');
	 	pList[index].innerHTML = "<b>Author:</b>\t" + element.author +"<br>" +" \t<b>Title:</b>\t" 
	 	+ element.title +"<br>" + "\t<b>Language:</b>\t" + element.language; 
	 }





}



