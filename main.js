let noteIdCounter = 8;

document.querySelectorAll(".column").forEach(columnElemnt => {
  const spanAction_addNote = columnElemnt.querySelector("[data-action-addNote]");
  spanAction_addNote.addEventListener("click", function (event) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute('draggable', 'true');
    noteElement.setAttribute('data-note-id', noteIdCounter);
    noteIdCounter++;
    columnElemnt.querySelector('[data-notes]').append(noteElement);
  });
});