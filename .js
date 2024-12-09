// script.js

// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

// DOM Elements
const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const shoppingListEl = document.getElementById("shopping-list");
const clearBtn = document.getElementById("clear-btn");

// Initialize the shopping list on page load
document.addEventListener("DOMContentLoaded", loadShoppingList);

// Add new item to the shopping list
addBtn.addEventListener("click", addItem);

// Clear the entire shopping list
clearBtn.addEventListener("click", clearList);

// Function to add a new item
function addItem() {
  const itemName = itemInput.value.trim();
  if (!itemName) {
    alert("Please enter an item.");
    return;
  }

  const item = { name: itemName, purchased: false };
  shoppingList.push(item);
  saveToLocalStorage();

  renderItem(item);
  itemInput.value = ""; // Clear input field
}

// Function to render an item to the DOM
function renderItem(item) {
  const li = document.createElement("li");
  li.className = `list-item ${item.purchased ? "purchased" : ""}`;

  // Create editable item name
  const span = document.createElement("span");
  span.textContent = item.name;
  span.contentEditable = true;
  span.addEventListener("input", () => editItemName(item, span.textContent));
  li.appendChild(span);

  // Create mark as purchased button
  const purchaseBtn = document.createElement("button");
  purchaseBtn.innerHTML = "&#10004;"; // Unicode Checkmark
  purchaseBtn.addEventListener("click", () => togglePurchased(item, li));
  li.appendChild(purchaseBtn);

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "&#x2716;"; // Unicode X
  deleteBtn.addEventListener("click", () => deleteItem(item, li));
  li.appendChild(deleteBtn);

  shoppingListEl.appendChild(li);
}

// Function to toggle purchased status
function togglePurchased(item, listItem) {
  item.purchased = !item.purchased;
  saveToLocalStorage();
  listItem.classList.toggle("purchased");
}

// Function to edit item name
function editItemName(item, newName) {
  item.name = newName.trim();
  saveToLocalStorage();
}

// Function to delete an item
function deleteItem(item, listItem) {
  shoppingList = shoppingList.filter(i => i !== item);
  saveToLocalStorage();
  listItem.remove();
}

// Function to clear the entire list
function clearList() {
  if (confirm("Are you sure you want to clear the list?")) {
    shoppingList = [];
    saveToLocalStorage();
    shoppingListEl.innerHTML = "";
  }
}

// Save shopping list to local storage
function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Load shopping list from local storage
function loadShoppingList() {
  shoppingList.forEach(item => renderItem(item));
}
