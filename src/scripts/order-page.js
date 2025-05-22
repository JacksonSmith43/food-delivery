addEventListener("DOMContentLoaded", (event) => {
    const foodSearchInput = document.getElementById("food-search-input");
    const foodSearchList = document.getElementById("food-search-list");
    let foodData = [];
    let restaurantData = [];

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

    async function fetchesRestaurant() {
        const response = await fetch('../data/restaurants.json');
        restaurantData = await response.json();
    }

    function displayFoodList(inputTerm) {
        foodSearchList.innerHTML = ""; // Empties the list. Makes sure that only valid results are displayed. 

        foodData.forEach((item) => { // Iterates through all of the dishes. 

            const foodName = item.name.toUpperCase();

            if (foodName.includes(inputTerm)) {
                const listItem = document.createElement("li");
                listItem.setAttribute("tabindex", "0");
                listItem.textContent = item.name;
                foodSearchList.appendChild(listItem);

                selectFoodItem(listItem, item);
            }
        });
    }

    function selectFoodItem(listItem, foodItem) {
        listItem.addEventListener("click", async () => {
            await fetchesRestaurant();
            await comparingFoodAndRestaurants(foodItem, restaurantData);
        });
    }

    async function comparingFoodAndRestaurants(food, restaurantData) {
        const restaurantIds = Array.isArray(food.restaurantId) // If it is not an array, turn it into one. Necessary for the JSON data. 
            ? food.restaurantId
            : [food.restaurantId];

        const isRestaurant = restaurantData.filter((restaurant) =>
            restaurantIds.includes(restaurant.id)
        );

        if (isRestaurant.length > 0) {
            const restaurantName = isRestaurant.map(r => r.name);

            console.log(`Restaurant IDs: ${food.restaurantId} Names: ${restaurantName}`);
            console.log(`Food ID: ${food.id} Name: ${food.name}`);
            showRestaurants(restaurantName);
        } else {
            console.log("No fitting restaurants have been found.");
        }
    }


    function showRestaurants(restaurantName) {
        const restaurantList = document.getElementById("food-search-results");
        const restaurantTitle = document.createElement("h2");
        restaurantList.innerHTML = "";

        restaurantTitle.textContent = restaurantName;

       /* if (restaurantName.length > 1) {
            restaurantTitle.textContent = "Restaurants: " + restaurantName.split(","); // PROBLEM. 
        }*/

        restaurantList.appendChild(restaurantTitle);
    }
})

