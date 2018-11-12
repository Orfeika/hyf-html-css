const URL = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

let http = new XMLHttpRequest();
http.open("GET",URL, true);


http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      console.log('Response from the server: ' + http.response);
    }
  }

  http.send();

