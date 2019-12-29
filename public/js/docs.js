const navbar = document.getElementById("docs_nav_list");
const links = document.getElementsByClassName("docs_nav_link");
const headers = Array.from(document.querySelectorAll("h3,h5"));
const codeBlocks = Array.from(document.getElementsByTagName("code"));
let navCounter = 1; // The counter starts at '1' so it can skip the 'Go Back' link

// Remove the HTML entities from the Markdown generated code blocks
function checkForTabEntities(elem) {
  const query = "&nbsp;&nbsp;";
  if (elem.innerText.includes(query))
    elem.innerHTML = elem.innerText.split(query).join("  ");
}

// Generate link markup
function linkMarkupGenerator({ id, innerText: text, tagName }, i = false) {
  return `<li class="${
    tagName === "H3" ? "main_link" : "sub_link"
  }"><a class="docs_nav_link" href="#${id}"> ${
    tagName === "H5" && i ? `${i}.` : ""
  } ${text}</a></li>`;
}

// Render link groups
function renderLinkGroup(links) {
  let groupDiv = document.createElement("div");
  groupDiv.className = "docs_nav_link_group";
  links.forEach(link => (groupDiv.innerHTML += link));
  navbar.appendChild(groupDiv);
}

// Generate link groups
function groupLinks(start) {
  const group = headers.slice(start, headers.length);
  // Add previous element to output array, since that is the H3
  const prev = group[0];
  let output = [linkMarkupGenerator(prev)];
  for (let i = 1; i < group.length; i++) {
    const current = group[i];
    if (current.tagName === "H3") break;
    output.push(linkMarkupGenerator(current, i));
  }
  renderLinkGroup(output);
}

// Generate anchor links for each "section" of the documentation
function addLinkToNavbar(e, i) {
  // H3 and H5 tags are used in the Markdown file to signify the beginning of a section
  if (e.tagName === "H3") groupLinks(i);
  // navbar.innerHTML += linkMarkupGenerator(e);
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

// Show and hide info tag
function revealAndCloseInfo() {
  const info = document.getElementById("info");
  // Revealing function
  function reveal() {
    // Remove the class, set the opacity back to default and then reveal the box by adding the 'reveal' class
    info.classList.remove("reveal");
    info.style.opacity = "1";
    info.classList.add("reveal");
    setTimeout(close, 3000);
  }
  // Closing function
  function close() {
    info.style.opacity = "0";
  }
  // Code goes here
  reveal();
  // Attach listeners
  window.addEventListener("keydown", ({ keyCode: key }) => {
    if (key === 74 || key === 75) close(); // If navigation keys are pressed, close the hint box
    if (key === 191) reveal(); // If the slash key's been pressed, reveal the hint box
  });
}

window.onload = () => {
  this.addEventListener("keydown", vimNavigation);
  codeBlocks.forEach(checkForTabEntities);
  headers.forEach(addLinkToNavbar);
  revealAndCloseInfo();
};
