Application.load();

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function (event) {
    const columnElement = Column.create();

    const headerElement = columnElement.querySelector(".column-header");

    document.querySelector(".columns").append(columnElement);

    headerElement.setAttribute("contenteditable", "true");
    headerElement.focus();

    Application.save();
  });
