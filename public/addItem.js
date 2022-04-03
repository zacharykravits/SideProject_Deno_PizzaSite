

const addToCartButtons = document.getElementsByClassName('addToCart');

const addToCartButtonsArray = Array.from(addToCartButtons);

addToCartButtonsArray.forEach((button, index, array) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        
    })
})