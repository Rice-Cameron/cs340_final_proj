
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
    let inputPubID = document.getElementById("input-pubID-update");

    // Get the values from the form fields
    let isbnValue = inputISBN.value;
    let titleValue = inputTitle.value;
    let pubYearValue = inputPubYear.value;
    let copiesValue = inputCopies.value;
    let pubIDValue = inputPubID.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (Object.is(isbnValue, undefined) || Object.is(isbnValue, null)){
        return;
    }

    if (Object.is(titleValue, undefined) || Object.is(titleValue, null)){
        return;
    }

    if (Object.is(pubYearValue, undefined) || Object.is(pubYearValue, null)){
        return;
    }
    
    if (Object.is(copiesValue, undefined) || Object.is(copiesValue, null)){
        return;
    }
    
    if (Object.is(pubIDValue, undefined) || Object.is(pubIDValue, null)){
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        isbn: isbnValue,
        title: titleValue,
        publicationYear: pubYearValue,
        copiesAvailable: copiesValue,
        publisherID: pubIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-book-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, isbnValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, isbn){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("book-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == isbn) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[2]; // title
            td.innerHTML = parsedData[1].title; 

            td = updateRowIndex.getElementsByTagName("td")[3]; // year
            td.innerHTML = parsedData[2].publicationYear;
            
            td = updateRowIndex.getElementsByTagName("td")[4]; // copies
            td.innerHTML = parsedData[3].copiesAvailable;

            td = updateRowIndex.getElementsByTagName("td")[5]; //pub ID
            td.innerHTML = parsedData[4].publisherID;

       }
    }
}
