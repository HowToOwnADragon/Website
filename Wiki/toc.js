const listContents = (tocElement, scopeElement = "body", levels = 3, tocTitle = false)=> {
    // Create Table of Contents (ToC) based on heading tags (H2 to H6)
    // TocElement - element ID to create ToC in (<DIV> only)
    // Levels - number of levels to include in ToC (1 to 5 starting with H2). Default=3 (H2-H4)
    // TocTitle - self explanatory
    const toc = document.getElementById(tocElement);
    const scope = document.querySelector(scopeElement);
  
    // find target DIV element to write ToC to, only accept DIV as valid element type, return on error
    if (!toc || toc.tagName !== "DIV") {
      console.error(
        `ToC: Missing or invalid target element with id=${tocElement}`
      );
      return;
    }
  
    // find tag name matching scopeElement, return if not found
    if (!scope) {
      console.error(
        `ToC: Missing element with id=${scopeElement} or valid element tag name`
      );
      return;
    }
  
    // determine which heading tags to search by slicing list 'levels' deep
    const tags = ["h2", "h3", "h4", "h5", "h6"].slice(0, levels);
  
    // find the relevant heading tags contained within the scope element
    const headings = Array.from(scope.querySelectorAll(tags.join(", ")));
  
    // create ToC only if headings found
    if (headings.length === 0) {
      return;
    }
  
    // add ToC title if supplied
    if (tocTitle) {
      const title = document.createElement("H2");
      title.innerText = tocTitle;
      title.classList.add("toc", "toc-title");
      toc.appendChild(title);
    }
  
    // nest ToC inside nav element 
    const nav = document.createElement("NAV");
    const list = document.createElement("UL");
    list.classList.add("toc", "toc-list");
    list.setAttribute("role", "list");
  
    // add ToC list to nav, add css classes
    // loop through headings in order of position on page
    headings.forEach((heading, index) => {
      // determine nesting level (h2->1, h3->2 etc)
      const level = Number(heading.nodeName[1]) - 1;
  
      // if heading has no id, create one from slugified title and assign to heading
      // pre-fix id with index to avoid duplicate id's
      if (!heading.id) {
        heading.id = `${index + 1}-${slugify(heading.innerText)}`;
      }
  
      // create element to hold link, add css including level specific css class
      const contentsItem = document.createElement("LI");
      contentsItem.classList.add(`toc`, `toc-item-l${level}`);
  
      // create link to point to ID of heading
      const link = document.createElement("A");
      link.textContent = heading.innerText;
      link.href = `#${heading.id}`;
  
      // add permalink to heading
      const permaLink = document.createElement("A");
      permaLink.className = "toc-link";
      permaLink.href = `#${heading.id}`;
      permaLink.innerHTML = heading.innerHTML;
      heading.innerHTML = "";
      heading.appendChild(permaLink);
  
      contentsItem.appendChild(link);
      list.appendChild(contentsItem);
    });
  
    // add nav & list to DOM
    nav.appendChild(list);
    toc.appendChild(nav);
  };