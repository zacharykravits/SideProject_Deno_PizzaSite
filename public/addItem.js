const addToCartModal = document.getElementById('addToCartModal');

const itemNamePlaceHolder = document.getElementById('itemName');
const itemBasePricePlaceHolder = document.getElementById('itemBasePrice');
const itemAdditionsSection = document.getElementById('itemAdditionsSection');
const itemAdditionsPlaceHolder = document.getElementById('itemAdditions');

const addToCartButtons = document.getElementsByClassName('addToCart');

const addToCartButtonsArray = Array.from(addToCartButtons);

addToCartButtonsArray.forEach((button, index, array) => {

    const itemName = button.dataset.name;
    const itemBasePrice = button.dataset.baseprice;
    const itemAllowsAdditions = button.dataset.allowsadditions;

    button.addEventListener('click', (event) => {
        event.preventDefault();
        if (addToCartModal.classList.contains('hidden')) {
            addToCartModal.classList.remove('hidden');
            
            itemNamePlaceHolder.innerText = itemName;
            itemBasePricePlaceHolder.innerText = itemBasePrice;
            if (itemAllowsAdditions === "true") {
                itemAdditionsSection.classList.remove('hidden');
                //
                array.map((addition, index) => {
                    console.log(topping);

                    return `
                        <div>
                            <p>${addition.name} - ${addition.price}</p>
                            <input id="${addition.name}" type="checkbox">
                        </div>
                    `
                }).join("")
            }
        }
    })
})