Application.load();

document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function (event) {
    const columnElement = Column.create();
    document.querySelector(".columns").append(columnElement);

    Application.save();
  });
