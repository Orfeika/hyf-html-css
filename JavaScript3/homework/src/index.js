'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'text') {
        elem.innerText = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
        console.log(data);
        createAnRepoList(data);
        let container =  createAndAppend("div", root, {id: "container"})
        createRepoOverwiew(data[0]);
        createContributors(data[0]);
        //change value if select repo in drop down 
        document.getElementById("RepoList").onchange = function(){
        let selectedItemIndex = this.options[this.selectedIndex].value;
        let table = document.getElementById("RepositoryOverwiew");
        table.parentNode.removeChild(table);
        let contributors =document.getElementById("contributors");
        contributors.parentNode.removeChild(contributors);

        createRepoOverwiew(data[selectedItemIndex]);
        createContributors(data[selectedItemIndex]);
      
      };
        //createAndAppend('pre', root, { text: JSON.stringify(data, null, 2) });
      }
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);


function createAnRepoList(array){
  createAndAppend('header', root, {class: 'header'});
  let header = document.getElementsByClassName('header')[0];
  createAndAppend('p', header, {text: "HYF Repositories"} );
  createAndAppend('select', header, {class: 'repo-selector', id : "RepoList"});
  let listRoot = document.getElementById('RepoList');
  for(let i = 0 ; i < array.length; i++){
    createAndAppend('option', listRoot, { text: array[i].name, value: i} )
  }  
}

function createRepoOverwiew(element){
 let container =  document.querySelector("#container");
 //creating table for repository overwiew 
 let table = createAndAppend("table", container, {id: "RepositoryOverwiew"});
 let repoRow = createAndAppend("tr", table);
 //creating row for repository and link 
 createAndAppend("td", repoRow, {text:"Repository:"})
 let repoLink = createAndAppend("td", repoRow, );
 createAndAppend("a", repoLink, {href: element.html_url,text: element.name , target: "_blank"})
 //creating row for repo description 
 let descriptionRow = createAndAppend("tr", table);
 createAndAppend("td", descriptionRow, {text:"Description:"})
 createAndAppend("td", descriptionRow, {text: element.description});
 //creating row for forks
 let forkRow = createAndAppend("tr", table);
 createAndAppend("td", forkRow, {text:"Fork:"})
 createAndAppend("td", forkRow, {text: element.forks_count});
 // creating 'last time updated' row 
 let updatedRow = createAndAppend("tr", table);
 createAndAppend("td", updatedRow, {text:"Updated:"})
 createAndAppend("td", updatedRow, {text: element.updated_at});
}


function createContributors(element){
  fetchJSON(element.contributors_url, (err, data) => {
    const root = document.getElementById('container');
    if (err) {
      createAndAppend('div', root, { text: err.message, class: 'alert-error' });
    } else {
      let contributors= createAndAppend('div', root, {id: "contributors"});
      createAndAppend("p", contributors,{class: "contributorsHeader" , text: "Contributors"} );
     let ul = createAndAppend("ul", contributors, {class: "contributorsList"});
     for(let i = 0; data.length; i++){
       let li = createAndAppend("li",ul, {class: "contributorItem"} );
       let img = createAndAppend("img", li, {src:data[i].avatar_url, class: "contributorsAvatar", height: 48}) 
       let div = createAndAppend("div", li, {class: "contributorsData"});
       let login = createAndAppend("div", div, {text: data[i].login});
       let badge = createAndAppend("div", div,{text: data[i].contributions} );

      }
    }
  });
  


}

}
