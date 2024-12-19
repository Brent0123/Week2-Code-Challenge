// Array to store shopping list items
let shoppingListItems = [];

// DOM elements
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const shoppingList = document.getElementById('shoppingList');

/**
 * Adds a new item to the shopping list
 */
function addItem() {
    const item = itemInput.value.trim();
    if (item) {
        // Add item to array
        shoppingListItems.push({ name: item, purchased: false });
        
        // Render the updated list
        renderList();
        
        // Clear the input field
        itemInput.value = '';
    }
}

/**
 * Renders the shopping list to the DOM
 */
function renderList() {
    shoppingList.innerHTML = '';
    shoppingListItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${item.purchased ? 'purchased' : ''}">${item.name}</span>
            <button class="mark-btn" data-index="${index}">${item.purchased ? 'Mark as Not Purchased' : 'Mark as Purchased'}</button>
        `;
        shoppingList.appendChild(listItem);
    });
    
    // Add event listeners to dynamically created buttons
    shoppingList.querySelectorAll('.mark-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            togglePurchaseStatus(index);
        });
    });
}

/**
 * Toggles the purchase status of an item
 * @param {number} index - The index of the item in the array
 */
function togglePurchaseStatus(index) {
    shoppingListItems[index].purchased = !shoppingListItems[index].purchased;
    renderList();
}

/**
 * Clears the entire shopping list
 */
function clearList() {
    shoppingListItems = [];
    renderList();
}

// Event listeners
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// For keyboard input
itemInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Initial render of the list (in case there are items from previous sessions)
renderList();