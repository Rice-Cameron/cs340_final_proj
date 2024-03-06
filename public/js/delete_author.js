function deleteAuthor(authorID) {
  let link = "/delete-author-ajax/";
  let data = {
    id: authorID,
  };

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(isbn);
    },
  });
}

function deleteRow(isbn) {
  let table = document.getElementById("author-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == id) {
      table.deleteRow(i);
      deleteDropDownMenu(id);
      break;
    }
  }
}

function deleteDropDownMenu(id) {
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(id)) {
      selectMenu[i].remove();
      break;
    }
  }
}
