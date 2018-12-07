"use strict";

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }

  /**
   * Initialization
   * @param {string} url The GitHub URL for obtaining the organization's repositories.
   */
  async initialize(url) {
    // Add code here to initialize your app
    // 1. Create the fixed HTML elements of your page
    // 2. Make an initial XMLHttpRequest using Util.fetchJSON() to populate your <select> element
    const root = document.getElementById("root");
    let header = Util.createAndAppend("header", root, { class: "header" });
    Util.createAndAppend("p", header, { text: "HYF Repositories" });
    let listRoot = Util.createAndAppend("select", header, {
      class: "repo-selector",
      id: "RepoList"
    });

    Util.createAndAppend("div", root, {
      id: "container"
    });

    try {
      // Trying to create and fetch request
      const repos = await Util.fetchJSON(url);
      //this.repos.sort((item1, item2) => item1.name.toUpperCase().localeCompare(item2.name.toUpperCase()));
      this.repos = repos
        .sort((item1, item2) =>
          item1.name.toUpperCase().localeCompare(item2.name.toUpperCase())
        )
        .map(repo => new Repository(repo));
      repos.forEach((element, index) => {
        Util.createAndAppend("option", listRoot, {
          text: element.name,
          value: index
        });
      });

      this.fetchContributorsAndRender(0);
      let option = document.getElementById("RepoList");
      option.onchange = select => {
        let selectedItemIndex = option.selectedIndex;
        this.fetchContributorsAndRender(selectedItemIndex);
      };
    } catch (error) {
      this.renderError(error);
    }
  }

  /**
   * Removes all child elements from a container element
   * @param {*} container Container element to clear
   */
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  /**
   * Fetch contributor information for the selected repository and render the
   * repo and its contributors as HTML elements in the DOM.
   * @param {number} index The array index of the repository.
   */
  async fetchContributorsAndRender(index) {
    try {
      const repo = this.repos[index];
      const contributors = await repo.fetchContributors();

      const container = document.getElementById("container");
      this.clearContainer(container);

      const leftDiv = Util.createAndAppend("div", container);
      const rightDiv = Util.createAndAppend("div", container);
      const contributorList = Util.createAndAppend("ul", rightDiv);
      Util.createAndAppend("p", contributorList, {
        class: "contributorsHeader",
        text: "Contributors"
      });

      repo.render(leftDiv);

      contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorList));
    } catch (error) {
      this.renderError(error);
    }
  }

  /**
   * Render an error to the DOM.
   * @param {Error} error An Error object describing the error.
   */
  renderError(error) {
    Util.createAndAppend("div", root, {
      text: error.message,
      class: "alert-error"
    });
  }
}

const HYF_REPOS_URL =
  "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

window.onload = () => new App(HYF_REPOS_URL);
