'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} parent The parent element in which to render the repository.
   */
  render(parent) {
    //
    // Replace this comment with your code
    //
    //creating table for repository overwiew
    let table = Util.createAndAppend("table", parent, {
      id: "RepositoryOverwiew"
    });
    let repoRow = Util.createAndAppend("tr", table);
    //creating row for repository and link
    Util.createAndAppend("td", repoRow, {
      text: "Repository:",
      style: "font-weight:bold"
    });
    let repoLink = Util.createAndAppend("td", repoRow);
    Util.createAndAppend("a", repoLink, {
      href: this.data.html_url,
      text: this.data.name,
      target: "_blank"
    });
    //creating row for repo description
    let descriptionRow = Util.createAndAppend("tr", table);
    Util.createAndAppend("td", descriptionRow, {
      text: "Description:",
      style: "font-weight:bold"
    });
    Util.createAndAppend("td", descriptionRow, { text: this.data.description });
    //creating row for forks
    let forkRow = Util.createAndAppend("tr", table);
    Util.createAndAppend("td", forkRow, {
      text: "Fork:",
      style: "font-weight:bold"
    });
    Util.createAndAppend("td", forkRow, { text: this.data.forks_count });
    // creating 'last time updated' row
    let updatedRow = Util.createAndAppend("tr", table);
    Util.createAndAppend("td", updatedRow, {
      text: "Updated:",
      style: "font-weight:bold"
    });
    let date = new Date(this.data.updated_at);
    date = date.toUTCString();
    Util.createAndAppend("td", updatedRow, { text: date });
  }

  /**
   * Returns an array of contributors as a promise
   */
  fetchContributors() {
    return Util.fetchJSON(this.data.contributors_url);
  }

  /**
   * Returns the name of the repository
   */
  name() {
    return this.data.name;
  }
}
