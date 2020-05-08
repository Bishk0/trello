let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedNote = null;

document.querySelectorAll(".column").forEach(columnProcess);

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function (event) {
    // create new columns
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", true);
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

function columnProcess(columnElement) {
  // create new cards
  const spanAction_addNote = columnElement.querySelector(
    "[data-action-addNote]"
  );
  spanAction_addNote.addEventListener("click", function (event) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("draggable", true);
    noteElement.setAttribute("data-note-id", noteIdCounter);
    noteIdCounter++;
    columnElement.querySelector("[data-notes]").append(noteElement);
    noteProcess(noteElement);
  });

  const headerElement = columnElement.querySelector(".column-header");
  headerElement.addEventListener("dblclick", function (event) {
    headerElement.setAttribute("contenteditable", true);
    headerElement.focus();
  });

  headerElement.addEventListener("blur", function (event) {
    headerElement.removeAttribute("contenteditable");
  });
columnElement.addEventListener("dragover", function (event) {
    event.preventDefault();
})
  columnElement.addEventListener("drop", function (event) {
    if (draggedNote) {
        return columnElement.querySelector("[data-notes]").append(draggedNote);
    }
  });

}

function noteProcess(noteElement) {
  // allow edit card
  noteElement.addEventListener("dblclick", function (event) {
    noteElement.setAttribute("contenteditable", true);
    noteElement.focus();
  });
  noteElement.addEventListener("blur", function (event) {
    noteElement.removeAttribute("contenteditable");
  });

  //------drag-and-drop-----
  noteElement.addEventListener("dragstart", dragstart_noteHandler);
  noteElement.addEventListener("dragend", dragend_noteHandler);
  noteElement.addEventListener("dragenter", dragenter_noteHandler);
  noteElement.addEventListener("dragover", dragover_noteHandler);
  noteElement.addEventListener("dragleave", dragleave_noteHandler);
  noteElement.addEventListener("drop", drop_noteHandler);
}

function dragstart_noteHandler(event) {
  draggedNote = this;
  this.classList.add("dragged");
  //   console.log("dragstart", event, this);
  event.stopPropagation();
}
function dragend_noteHandler(event) {
  draggedNote = null;
  this.classList.remove("dragged");

  document
    .querySelectorAll(".note")
    .forEach((x) => x.classList.remove("under"));
  //   console.log("dragend", event, this);
}
function dragenter_noteHandler(event) {
  if (this === draggedNote) {
    return;
  }
  this.classList.add("under");
  //   console.log("dragenter", event, this);
}
function dragover_noteHandler(event) {
  event.preventDefault();

  if (this === draggedNote) {
    return;
  }
  //   console.log("dragover", event, this);
}
function dragleave_noteHandler(event) {
  if (this === draggedNote) {
    return;
  }
  this.classList.remove("under");
  //   console.log("dragleave", event, this);
}
function drop_noteHandler(event) {
    event.stopPropagation();
  if (this === draggedNote) {
    return;
  }
  //   console.log("drop", event, this);
  if (this.parentElement === draggedNote.parentElement) {
    const note = Array.from(this.parentElement.querySelectorAll(".note"));
    const indexA = note.indexOf(this);
    const indexB = note.indexOf(draggedNote);
    if (indexA < indexB) {
        this.parentElement.insertBefore(draggedNote, this);
    } else {
        this.parentElement.insertBefore(draggedNote, this.nextElementSibling);
    }
  } else {
    this.parentElement.insertBefore(draggedNote, this);
  }

}
