const addItem = (basePrice) => {
    if (document.getElementById('additions')) {
    
        let additionsForAddedItem = [];
    
        console.log('additions do exist');
    
        const additionCheckboxes = document.querySelectorAll('[data-checkbox-addition');
        const additionCheckboxesArray = Array.from(additionCheckboxes);
    
        additionCheckboxesArray.map((input, index, array) => {
            let subtotal = basePrice;
            if (input.checked) {
                const addition = {
                    additionNumber: index,
                    additionType: input.dataset.checkboxAddition,
                    additionPrice: parseFloat(input.dataset.price, 10)
                }
    
                additionsForAddedItem.push(addition);
    
                subtotal += addition.additionPrice;
            }
        })
    }
}

const cartUpdate = () => {

    const addItemToCartButton = document.getElementById('addItemButton');

    addItemToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        addItem(data.items.documents[buttonNumber].basePrice);
        document.cookie = ""
    })
}

export default cartUpdate;