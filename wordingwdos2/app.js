document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    const summaryTable = document.getElementById('order-summary').getElementsByTagName('tbody')[0];
    const totalPriceElem = document.getElementById('total-price');
    const favourites = JSON.parse(localStorage.getItem('favourites')) || {};

    function calculateTotal() {
        let total = 0;
        while (summaryTable.firstChild) {
            summaryTable.removeChild(summaryTable.firstChild);
        }

        const items = form.querySelectorAll('input[type="number"]');
        items.forEach(item => {
            const quantity = parseInt(item.value, 10);
            const price = parseFloat(item.dataset.price);
            const totalItemPrice = price * quantity;

            if (quantity > 0) {
                const row = summaryTable.insertRow();
                row.insertCell(0).textContent = item.name;
                row.insertCell(1).textContent = `$${price.toFixed(2)}`;
                row.insertCell(2).textContent = quantity;
                row.insertCell(3).textContent = `$${totalItemPrice.toFixed(2)}`;

                total += totalItemPrice;
            }
        });

        totalPriceElem.textContent = total.toFixed(2);
    }

    function addToFavourites() {
        const items = form.querySelectorAll('input[type="number"]');
        const newFavourites = {};

        items.forEach(item => {
            const quantity = parseInt(item.value, 10);
            const price = parseFloat(item.dataset.price);

            if (quantity > 0) {
                newFavourites[item.name] = { quantity, price };
            }
        });

        localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }

    function applyFavourites() {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
        if (savedFavourites) {
            for (const [itemName, details] of Object.entries(savedFavourites)) {
                const input = form.querySelector(`input[name="${itemName}"]`);
                if (input) {
                    input.value = details.quantity;
                }
            }
            calculateTotal();
        }
    }

    document.getElementById('calculate').addEventListener('click', calculateTotal);
    document.getElementById('add-to-favourites').addEventListener('click', addToFavourites);
    document.getElementById('apply-favourites').addEventListener('click', applyFavourites);

    document.getElementById('buy-now').addEventListener('click', () => {
        // Save form data to localStorage or sessionStorage if needed
        window.location.href = 'checkout.html';
    });
});
