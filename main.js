let noteIdCounter = 8;
let columnIdCounter = 4;

document.querySelectorAll(".column").forEach(columnProcess);

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function (event) { // create new columns
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");
    columnElement.setAttribute("data-note-id", columnIdCounter);
    columnElement.innerHTML = `
     <p class="column-header">New column</p>
       <div data-notes></div>
     <p class="column-footer"> <span data-action-addNote class="action">+ Добавити картку</span></p>
    `;
    columnIdCounter++;
    document.querySelector(".columns").append(columnElement);
    columnProcess(columnElement);
  });

document.querySelectorAll(".note").forEach(noteProcess);

function columnProcess(columnElement) { // create new cards
  const spanAction_addNote = columnElement.querySelector(
    "[data-action-addNote]"
  );
  spanAction_addNote.addEventListener("click", function (event) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("draggable", "true");
    noteElement.setAttribute("data-note-id", noteIdCounter);
    noteIdCounter++;
    columnElement.querySelector("[data-notes]").append(noteElement);
    noteProcess(noteElement);
  });
}

function noteProcess(noteElement) { // allow edit card
  noteElement.addEventListener("dblclick", function (event) {
    noteElement.setAttribute("contenteditable", "true");
    noteElement.focus();
  });
  noteElement.addEventListener("blur", function (event) {
    noteElement.removeAttribute("contenteditable");
  });
}
