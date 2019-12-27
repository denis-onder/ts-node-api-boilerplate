const navbar = document.getElementById("docs_nav_list");
const links = document.getElementsByClassName("docs_nav_link");
let navCounter = 1; // The counter starts at '1' so it can skip the 'Go Back' link

function checkForTabEntities(elem) {
  const query = "&nbsp;&nbsp;";
  if (elem.innerText.includes(query))
    elem.innerHTML = elem.innerText.split(query).join("  ");
}

function addLinkToNavbar({ id, innerText: text, tagName }) {
  navbar.innerHTML += `<li ${
    tagName === "H5" ? `style="margin: 0"` : false
  }><a class="docs_nav_link" href="#${id}"> ${
    tagName === "H5" ? ">" : ""
  } ${text.replace(":", "")}</a></li>`;
}

function vimNavigation({ keyCode }) {
  if (keyCode === 75) {
    // 'J' key handler -> Move down
    if (navCounter > 0) navCounter--;
    links[navCounter].focus();
  } else if (keyCode === 74) {
    // 'K' key handler -> Move up
    if (navCounter < links.length - 1) navCounter++;
    links[navCounter].focus();
  }
}

window.onload = () => {
  this.addEventListener("keydown", vimNavigation);
  Array.from(document.getElementsByTagName("code")).forEach(
    checkForTabEntities
  );
  Array.from(document.querySelectorAll("h3,h5")).forEach(addLinkToNavbar);
};
