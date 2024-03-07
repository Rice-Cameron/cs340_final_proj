function deleteBooksAuthors(authorshipID) {
    let link = "/delete-books-authors-ajax/";
    let data = {
        authorshipID: authorshipID,
    };
  
    $.ajax({
      url: link,
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(authorshipID);
      },
    });
  }
  
  function deleteRow(authorshipID) {
    let table = document.getElementById("books-authors-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
      if (table.rows[i].getAttribute("data-value") == authorshipID) {
        table.deleteRow(i);
        break;
      }
    }
  }