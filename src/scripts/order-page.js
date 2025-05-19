addEventListener("DOMContentLoaded", (event) => {
    const foodSearchInput = document.getElementById("food-search-input");
    const foodSearchList = document.getElementById("food-search-list");
    let foodData = [];

    fetchFoodData();

    foodSearchInput.addEventListener("input", () => {

        const inputTerm = foodSearchInput.value.trim().toUpperCase();

        if (inputTerm === "") {
            foodSearchList.innerHTML = "";
            return;

        } else {
            displayFoodList(inputTerm);
        }

    });

    async function fetchFoodData() {
        const response = await fetch('../data/dishes.json') // Fetches the JSON file.
        foodData = await response.json(); // Once the file has successfuly been loaded the data from the HTTP response will be converted into a JSON object. // AKA: Convert the response to JSON.  
    }

    function displayFoodList(inputTerm) {
        foodSearchList.innerHTML = ""; // Empties the list. Makes sure that only valid results are displayed. 

        foodData.forEach((item) => { // Iterates through all of the dishes. 

            const foodName = item.name.toUpperCase();

            if (foodName.includes(inputTerm)) {
                const listItem = document.createElement("li");
                listItem.textContent = item.name;
                foodSearchList.appendChild(listItem);
            }
        });
    }

})

