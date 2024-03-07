function deleteBook(isbn) {
    let link = '/delete-book-ajax/';
    let data = {
        isbn: isbn
    };
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(isbn);
      }
    });
  }
  
  function deleteRow(isbn){
      let table = document.getElementById("book-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == isbn) {
              table.deleteRow(i);
              deleteDropDownMenu(isbn);
              break;
         }
      }
  }

  function deleteDropDownMenu(isbn){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(isbn)){
        selectMenu[i].remove();
        break;
      } 
    }
  }