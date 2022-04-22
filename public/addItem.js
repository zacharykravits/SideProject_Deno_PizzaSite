// const addToCartModal = document.getElementById('addToCartModal');

// const itemNamePlaceHolder = document.getElementById('itemName');
// const itemBasePricePlaceHolder = document.getElementById('itemBasePrice');
// const itemAdditionsSection = document.getElementById('itemAdditionsSection');
// const itemAdditionsPlaceHolder = document.getElementById('itemAdditions');
// const formData_ItemNamePlaceHolder = document.getElementById('formData-itemName');
// const formData_ItemBasePricePlaceHolder = document.getElementById('formData-itemBasePrice');

// const addToCartButtons = document.getElementsByClassName('addToCart');
// const addToCartButtonsArray = Array.from(addToCartButtons);

// addToCartButtonsArray.forEach((button, index, array) => {

//     const itemName = button.dataset.name;
//     const itemBasePrice = button.dataset.baseprice;
//     console.log('itemBasePrice: ', itemBasePrice);
//     const itemAllowsAdditions = button.dataset.allowsadditions;

//     button.addEventListener('click', (event) => {
//         event.preventDefault();
//         if (addToCartModal.classList.contains('hidden')) {
//             addToCartModal.classList.remove('hidden');
            
//             itemNamePlaceHolder.innerText = itemName;
//             formData_ItemNamePlaceHolder.value = itemName;
//             // formData_ItemBasePricePlaceHolder.value = itemBasePrice;

//             itemBasePricePlaceHolder.innerText = itemBasePrice;
//             if (itemAllowsAdditions === "true") {
//                 itemAdditionsSection.classList.remove('hidden');
//             }
//         }
//     })
// })

// const pushToCartButton = document.getElementById('pushToCart');

// pushToCartButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log('pushed to cart');


// })

