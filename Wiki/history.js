// tableGenerator.js
function generateHistory(headers, data, divId = "History") {
  const div = document.getElementById(divId);
  if (!div) {
    console.error('Div element not found');
    return;
  }

  const table = document.createElement('table');
  div.appendChild(table);

  const container = document.createElement("DIV");
  container.style.display = "flex";
  container.style.alignItems = "center";

  const title = document.createElement("H2");
  title.innerText = "History";
  title.classList.add("CollapsablElementTitle");

  const hidebutton = document.createElement("H6");
  hidebutton.innerText = "[hide]";
  hidebutton.classList.add("history-hidebutton")
  hidebutton.addEventListener('click', ()=> {
      table.classList.toggle("hidden");
      if (table.classList.contains("hidden")) {
        hidebutton.innerText = "[show]";
      }
      else {
        hidebutton.innerText = "[hide]";
      }
  })
  container.appendChild(title);
  container.appendChild(hidebutton);
  div.insertBefore(container, table);

  // Generate headers
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let header of headers) {
      let th = document.createElement("th");
      th.innerText = header;
      row.appendChild(th);
  }

  // Generate rows
  let tbody = table.createTBody();
  for (let rowData of data) {
    let row = tbody.insertRow();
    for (let cellData of rowData) {
      let cell = row.insertCell();
      cell.innerText = cellData;
    }
  }
}