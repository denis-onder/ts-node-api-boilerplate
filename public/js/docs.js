const navbar = document.getElementById("docs_nav_list");

function checkForTabEntities(elem) {
  const query = "&nbsp;&nbsp;";
  if (elem.innerText.includes(query))
    elem.innerHTML = elem.innerText.split(query).join("  ");
}

function addLinkToNavbar({ id, innerText: text }) {
  navbar.innerHTML += `<li><a href="#${id}">${text.replace(":", "")}</a></li>`;
}

Array.from(document.getElementsByTagName("code")).forEach(checkForTabEntities);
Array.from(document.getElementsByTagName("h3")).forEach(addLinkToNavbar);
