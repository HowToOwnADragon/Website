// Create Table of Contents (ToC) based on heading tags (H2 to H6)
function createTableOfContents(tocElement = "toc", scopeElement = "body", levels = 3, tocTitle = false) {
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
      const title = document.createElement("H2");
      title.innerText = tocTitle;
      title.classList.add("toc", "toc-title");
      toc.appendChild(title);
  }

  const nav = document.createElement("NAV");
  const list = document.createElement("UL");
  list.classList.add("toc", "toc-list");
  list.setAttribute("role", "list");

  headings.forEach((heading, index) => {
      const level = Number(heading.nodeName[1]) - 1;

      if (!heading.id) {
          heading.id = `${index + 1}-${slugify(heading.innerText)}`;
      }

      const contentsItem = document.createElement("LI");
      contentsItem.classList.add(`toc`, `toc-item-l${level}`);

      const link = document.createElement("A");
      link.textContent = heading.innerText;
      link.href = `#${heading.id}`;

      const permaLink = document.createElement("A");
      permaLink.className = "toc-link";
      permaLink.href = `#${heading.id}`;
      permaLink.innerHTML = heading.innerHTML;
      heading.innerHTML = "";
      heading.appendChild(permaLink);

      contentsItem.appendChild(link);
      list.appendChild(contentsItem);
  });

  nav.appendChild(list);
  toc.appendChild(nav);
}
