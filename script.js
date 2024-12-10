document.getElementById('addBtn').addEventListener('click', function() {
    const item = document.getElementById('itemInput').value;
    if (item) {
        const list = document.getElementById('shoppingList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item}</span>
            <button class="mark-btn">Mark as Purchased</button>
        `;
        list.appendChild(listItem);
        document.getElementById('itemInput').value = '';
        
        listItem.querySelector('.mark-btn').addEventListener('click', function() {
            const span = this.previousElementSibling;
            span.classList.toggle('purchased');
            if (span.classList.contains('purchased')) {
                this.textContent = 'Mark as Not Purchased';
            } else {
                this.textContent = 'Mark as Purchased';
            }
        });
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('shoppingList').innerHTML = '';
});