function deleteReview(reviewID) {
    let link = "/delete-review-ajax/";
    let data = {
        reviewID: reviewID,
    };

    $.ajax({
        url: link,
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(reviewID);
        },
    });
}

function deleteRow(reviewID) {
    let table = document.getElementById("review-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
        if (table.rows[i].getAttribute("data-value") == reviewID) {
            table.deleteRow(i);
            break;
        }
    }
}