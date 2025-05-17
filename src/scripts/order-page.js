addEventListener("DOMContentLoaded", (event) => {

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


    const foodSearchInput = document.getElementById("food-search-input");
    const foodSearchList = document.querySelectorAll("#food-search-list li");

    foodSearchInput.addEventListener("input", () => {
        const filter = foodSearchInput.value.toUpperCase();

        foodSearchList.forEach((li) => {
            const text = li.textContent.toUpperCase();
            console.log("text:", text);
            console.log("li:", li);

            li.style.display = text.includes(filter) ? "" : "none";
        });
    });

})

