document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');

    document.getElementById('pay').addEventListener('click', () => {
        if (form.checkValidity()) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5); // Example delivery date

            alert(`Thank you for your purchase! Your order will be delivered on ${deliveryDate.toDateString()}.`);
        } else {
            alert('Please fill in all required fields.');
        }
    });
});