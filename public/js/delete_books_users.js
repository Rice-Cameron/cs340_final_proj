function deleteBooksUsers(borrowingID) {
    let link = "/delete-books-users-ajax/";
    let data = {
        borrowingID: borrowingID,
    };

    $.ajax({
        url: link,
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(borrowingID);
        },
    });
}

function deleteRow(borrowingID) {
    let table = document.getElementById("books-users-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
        if (table.rows[i].getAttribute("data-value") == borrowingID) {
            table.deleteRow(i);
            break;
        }
    }
}