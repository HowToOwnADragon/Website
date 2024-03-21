  // Create Table of Contents (ToC) based on heading tags (H2 to H6)
function createTableOfContents(tocElement = "toc", scopeElement = "body", levels = 3, tocTitle = "Table of Contents:", hidebuttontxt = "[hide]", showbuttontxt = "[show]") {
  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const toc = document.getElementById(tocElement);
  const scope = document.querySelector(scopeElement);

  if (!toc || toc.tagName !== "DIV") {
      console.error(`ToC: Missing or invalid target element with id=${tocElement}`);
      return;
  }

  if (!scope) {
      console.error(`ToC: Missing element with id=${scopeElement} or valid element tag name`);
      return;
  }

  const tags = ["h2", "h3", "h4", "h5", "h6"].slice(0, levels);
  const headings = Array.from(scope.querySelectorAll(tags.join(", ")));

  if (headings.length === 0) {
      return;
  }

  if (tocTitle) {
    const container = document.createElement("DIV");
    container.style.display = "flex";
    container.style.alignItems = "center";

    const title = document.createElement("H2");
    title.innerText = tocTitle;
    title.classList.add("toc-title");

    const hidebutton = document.createElement("H6");
    hidebutton.innerText = hidebuttontxt;
    hidebutton.classList.add("toc-hidebutton")
    hidebutton.addEventListener('click', ()=> {
        nav.classList.toggle("hidden");
        if (nav.classList.contains("hidden")) {
          hidebutton.innerText = showbuttontxt;
        }
        else {
          hidebutton.innerText = hidebuttontxt;
        }
    })

    container.appendChild(title);
    container.appendChild(hidebutton);
    toc.appendChild(container);
  }

  const nav = document.createElement("NAV");
  const list = document.createElement("UL");
  list.classList.add("toc", "toc-list", "hidden");
  list.setAttribute("role", "list");

  headings.forEach((heading, index) => {
      /* notoc class in headers excludes them from toc */
    if (heading.classList.contains('notoc')) {
      return;
  }
      const level = Number(heading.nodeName[1]) - 1;

      if (!heading.id) {
          heading.id = `${index + 1}-${slugify(heading.innerText)}`;
      }

      const contentsItem = document.createElement("LI");
      contentsItem.classList.add(`toc`, `toc-item-l${level}`, `hidden`);

      const link = document.createElement("A");
      link.textContent = heading.innerText;
      link.href = `#${heading.id}`;
      link.classList.add('toc-link');

      contentsItem.appendChild(link);
      list.appendChild(contentsItem);
  });

  nav.appendChild(list);
  toc.appendChild(nav);

}
