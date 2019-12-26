const navbar = document.getElementById("docs_nav_list");

function checkForTabEntities(elem) {
  const query = "&nbsp;&nbsp;";
  if (elem.innerText.includes(query))
    elem.innerHTML = elem.innerText.split(query).join("  ");
}

function addLinkToNavbar({ id, innerText: text, tagName }) {
  navbar.innerHTML += `<li ${
    tagName === "H5" ? `style="margin: 0"` : false
  }><a href="#${id}"> ${tagName === "H5" ? ">" : ""} ${text.replace(
    ":",
    ""
  )}</a></li>`;
}

window.onload = () => {
  Array.from(document.getElementsByTagName("code")).forEach(
    checkForTabEntities
  );
  Array.from(document.querySelectorAll("h3,h5")).forEach(addLinkToNavbar);
};
