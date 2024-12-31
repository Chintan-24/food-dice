document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const rollButton = document.getElementById('rollButton');
    const foodDisplay = document.getElementById('foodDisplay');
    const newFoodInput = document.getElementById('newFood');
    const addFoodButton = document.getElementById('addFoodButton');
    const errorMsg = document.getElementById('error');
    const customList = document.getElementById('customList');
    const listToggleBtn = document.getElementById('listToggleBtn');

    // Initialize food list with categories and items
    let foodData = JSON.parse(localStorage.getItem('foodData')) || {
        'breakfast': ['w'],
        'breakfast-lunch': ['w'],
        'lunch': ['w'],
        'evening-snacks': ['w'],
        'dinner': ['w'],
        'night-snacks': ['w']
    };

    // Function to save food data to localStorage
    function saveFoodData() {
        localStorage.setItem('foodData', JSON.stringify(foodData));
    }

    // Function to display custom food list
    function displayCustomList() {
        customList.innerHTML = ''; // Clear the existing list before displaying updated data
        for (let category in foodData) {
            foodData[category].forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${category}: ${item}`;
                customList.appendChild(li);
            });
        }
    }

    // Function to roll for a random food item
    function rollForFood() {
        const category = categorySelect.value;
        const foods = foodData[category];

        if (foods.length === 0) {
            foodDisplay.textContent = `No food items available for ${category}. Please add some.`;
            return;
        }

        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        foodDisplay.textContent = `How about: ${randomFood}?`;
    }

    // Function to add or replace a food item
    function addFoodItem() {
        const foodName = newFoodInput.value.trim().toLowerCase();
        const category = categorySelect.value;

        // Check if the food item already exists (case insensitive)
        if (foodData[category].some(item => item.toLowerCase() === foodName)) {
            // Replace the old item with the new one
            const index = foodData[category].findIndex(item => item.toLowerCase() === foodName);
            if (index !== -1) {
                foodData[category][index] = foodName; // Replace the existing item
            }
        } else {
            // Add the new food item if not already present
            foodData[category].push(foodName);
        }

        saveFoodData();
        displayCustomList();

        // Clear input
        newFoodInput.value = '';
    }

    // Function to toggle the visibility of the custom food list
    function toggleListVisibility() {
        if (customList.style.maxHeight === "0px") {
            customList.style.maxHeight = "500px";  // Expand the list
            listToggleBtn.textContent = "Hide Custom Food List";
        } else {
            customList.style.maxHeight = "0px";  // Collapse the list
            listToggleBtn.textContent = "Show Custom Food List";
        }
    }

    // Event Listeners
    rollButton.addEventListener('click', rollForFood);
    addFoodButton.addEventListener('click', addFoodItem);
    listToggleBtn.addEventListener('click', toggleListVisibility);

    // Initial setup
    displayCustomList();
});
