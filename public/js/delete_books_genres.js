function deleteBooksGenres(assignmentID) {
    let link = "/delete-books-genres-ajax/";
    let data = {
        assignmentID: assignmentID,
    };

    $.ajax({
        url: link,
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(assignmentID);
        },
    });
}

function deleteRow(assignmentID) {
    let table = document.getElementById("books-genres-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
        if (table.rows[i].getAttribute("data-value") == assignmentID) {
            table.deleteRow(i);
            break;
        }
    }
}