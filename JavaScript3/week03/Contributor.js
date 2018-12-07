'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render the contributor info to the DOM.
   * @param {HTMLElement} contributorList The parent element in which to render the contributor.
  */
  render(contributorList) {
    // Replace this comment with your code
      let li = Util.createAndAppend("li", contributorList, { class: "contributorItem" });
      let img = Util.createAndAppend("img", li, {
        src: this.data.avatar_url,
        class: "contributorsAvatar",
        height: 48
      });
      let login = Util.createAndAppend("a", li, {
        text: this.data.login,
        href: this.data.html_url,
        target: "_blank",
        class: "contributorName"
      });
      let badge = Util.createAndAppend("div", li, {
        text: this.data.contributions,
        class: "contributorBadge"
      });
    

  }
}
