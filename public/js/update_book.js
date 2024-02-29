
// Get the objects we need to modify
let updateBookForm = document.getElementById('update-book-form-ajax');

// Modify the objects we need
updateBookForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputISBN = document.getElementById("mySelect");
    let inputTitle = document.getElementById("input-title-update");
    let inputPubYear = document.getElementById("input-pubyear-update");
    let inputCopies = document.getElementById("input-copies-update");
    let inputPubName = document.getElementById("input-pubname-update");

    // Get the values from the form fields
    let isbnValue = inputISBN.value;
    let titleValue = inputTitle.value;
    let pubYearValue = inputPubYear.value;
    let copiesValue = inputCopies.value;
    let pubNameValue = inputPubName.value;

    // if (isNaN(pubYearValue) || isNaN(copiesValue)){
    //     alert("Publication Year and Copies Available must be numbers")
    //     return
    // }

    // if (isbnValue === undefined || titleValue === undefined || pubIDValue === undefined){
    //     alert("Fill in all fields before submitting")
    //     return
    // }
    

    // Put our data we want to send in a javascript object
    let data = {
        isbn: isbnValue,
        title: titleValue,
        publicationYear: pubYearValue,
        copiesAvailable: copiesValue,
        publisherName: pubNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-book-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, isbnValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, isbn){
    let table = document.getElementById("book-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == isbn) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[1]; // title
            td.innerHTML = data['title']; 

            td = updateRowIndex.getElementsByTagName("td")[2]; // year
            td.innerHTML = data['publicationYear'];
            
            td = updateRowIndex.getElementsByTagName("td")[3]; // copies
            td.innerHTML = data['copiesAvailable'];

            td = updateRowIndex.getElementsByTagName("td")[4]; //pub ID
            td.innerHTML = data['publisherName'];
       }
    }
}
