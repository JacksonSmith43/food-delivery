fetch('../data/dishes.json')
    .then(response => response.json()) // Once the file has successfuly been loaded the data from the HTTP response will be converted into a JSON object. // AKA: Convert the response to JSON (this returns a Promise).  
    .then(data => {  // Use the JSON data once it's available. 

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
        }
    })
    .catch(error => {   // Handle any errors that might occur during fetch or parsing. 
        console.error('Error fetching the JSON file:', error);
    });


function searchesFoods() {
    let foodSearchInput = document.getElementById("food-search-input");
    let foodSearchList = document.querySelector("#food-search-list");

    let filter, li, a, i, txtValue;
    li = foodSearchList.getElementsByTagName("li");
    filter = foodSearchInput.value.toUpperCase();

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";

        } else {
            li[i].style.display = "none";
        }
    }
}

