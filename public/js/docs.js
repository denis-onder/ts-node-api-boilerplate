const navbar = document.getElementById("docs_nav_list");
const links = document.getElementsByClassName("docs_nav_link");
let navCounter = 1; // The counter starts at '1' so it can skip the 'Go Back' link

// Remove the HTML entities from the Markdown generated code blocks
function checkForTabEntities(elem) {
  const query = "&nbsp;&nbsp;";
  if (elem.innerText.includes(query))
    elem.innerHTML = elem.innerText.split(query).join("  ");
}

// Generate anchor links for each "section" of the documentation
function addLinkToNavbar({ id, innerText: text, tagName }) {
  // H3 and H5 tags are used in the Markdown file to signify the beginning of a section
  navbar.innerHTML += `<li ${
    tagName === "H5" ? `style="margin: 0"` : false
  }><a class="docs_nav_link" href="#${id}"> ${
    tagName === "H5" ? ">" : ""
  } ${text.replace(":", "")}</a></li>`;
}

// Integrate Vim style navigation for the navigation bar
function vimNavigation({ keyCode: key }) {
  // 74 => J || 75 => K
  if (key === 74 || key === 75) {
    switch (key) {
      case 74: // J => Move the focus down the navigation bar
        if (navCounter < links.length - 1) navCounter++;
        links[navCounter].focus();
        break;
      case 75: // K => Move the focus up the navigation bar
        if (navCounter > 0) navCounter--;
        links[navCounter].focus();
        break;
    }
  }
}

window.onload = () => {
  this.addEventListener("keydown", vimNavigation);
  Array.from(document.getElementsByTagName("code")).forEach(
    checkForTabEntities
  );
  Array.from(document.querySelectorAll("h3,h5")).forEach(addLinkToNavbar);
};
