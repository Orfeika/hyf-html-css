"use strict";
const URL = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

let http = new XMLHttpRequest();
http.open("GET",URL, true);
let json = [];


http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
        let myArr = JSON.parse(this.responseText);
     //   parseJSON(myArr);
        console.log(myArr);
        createView();
        createList(myArr);



    }
  }

  function createView(){
    let div = document.querySelector('#root');
    let header = document.createElement('header');
    header.setAttribute('class', 'header');
    header.setAttribute('id', 'header');
    div.appendChild(header);
    let p = document.createElement('p');
    p.innerHTML = "HYF Repositories";
    header.appendChild(p);
    let container = document.createElement('div');
    container.setAttribute('id', 'container');
    div.appendChild(container);



  }



function createList(array){
    let div = document.querySelector('#header');
    let select = document.createElement('select');
    select.setAttribute('class', 'repo-selector');
    select.setAttribute('aria-label', 'HYF Repositories');
    header.appendChild(select);
    for(let i = 0 ; i<array.length; i++){
        let option =document.createElement('option');
        option.innerHTML = array[i].name;
        option.setAttribute('value', i);
        select.appendChild(option);
    }
            
    
}

function createRepositoryInfo(array){
 let container = document.querySelector('#container');
 let div = document.createElement('div');
 div.setAttribute('class', 'repository-overwiew');
 let table = document.crea

}

    
    



  http.send();
  http.onreadystatechange();



