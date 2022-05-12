let categories = [];

const editPrice = (buttonClicked, data) => {
    const buttonNumber = buttonClicked.id;
    const itemBasePrice = data.items.documents[buttonNumber].basePrice;
    if (document.getElementById('additions')) {
        const itemSubtotalDisplay = document.getElementById('item-subtotal')
        const inputAdditions = document.querySelectorAll('[data-checkbox-input]')
        const inputAdditionsArray = Array.from(inputAdditions);
        let itemSubtotal = parseInt(itemBasePrice, 10);

        // loop over inputs add on click handler
        // on click
        //// loop over inputs see what is selected
        ////// if selected, add to subtotal

        inputAdditionsArray.map((input, index, array) => {
            input.addEventListener('click', () => {
                inputAdditionsArray.forEach((input) => {
                    if (input.checked) {
                        itemSubtotal += parseInt(input.dataset.price, 10);
                    }
                })
                itemSubtotalDisplay.innerHTML = itemSubtotal;
            })
        })
    }
}

const cancelChanges = () => {
    const modal = document.getElementById('modal');
    const cancelButton = document.getElementById('cancelChangesButton');

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.remove();
    })
}

const createCategories = (data) => {
    const items = data.items.documents
    items.map((item, index, array) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    })
}

const renderCategories = (categories) => {
    categories.map((category, index, array) => {
        const menuArea = document.getElementById('menu-list');
        menuArea.insertAdjacentHTML('beforeend',
            `
            <div class='w-full'>
                <h3>${category}</h3>
                <div data-category-section="${category}" class='full'></div>
            </div> 
            `
        )
    })
}

const renderItems = (data) => {
    const items = data.items.documents;
    items.map((item, index, array) => {
        const categoryToRenderTo = document.querySelector(`[data-category-section="${item.category}"]`)
        item.available === true ?
            categoryToRenderTo.insertAdjacentHTML('beforeend',
                `
                <div class='flex w-full justify-space-between'>
                    <div>
                        <p>${item.name}</p>
                        <p>${item.description}</p>
                        <p>${item.basePrice}</p>
                    </div>
                    <button id=${index} data-menu-item="${item.name}">Add</button>
                <div>
                `
            )
            :
            categoryToRenderTo.insertAdjacentHTML('beforeend',
                `
                <div>
                    <p>${item.name} - Not Available Right Now</p>
                <div>
                `
            )
    })
    const addButtons = document.querySelectorAll("[data-menu-item]");
    const addButtonsArray = Array.from(addButtons);
    addButtonsArray.forEach((button, index, array) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            renderModal(button, data);
        })
    });
}

const addItem = (basePrice) => {
    let additionsForAddedItem = [];
    const addItemButton = document.getElementById('addItemButton');
    
    addItemButton.addEventListener('click', (_event) => {
        let subtotal = basePrice;
        if (document.getElementById('additions')) {
            console.log('additions do exist')
            
            const additionCheckboxes = document.querySelectorAll('[data-checkbox-addition]');
            const additionCheckboxesArray = Array.from(additionCheckboxes);
            additionCheckboxesArray.map((input, index, array) => {
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

        let addItem = {
            item: document.getElementById('typeOfItem').innerHTML,
            numberOfItem: parseInt(document.getElementById('numberOfItem').value, 10),
            additionsToItem: document.getElementById('additions') ? additionsForAddedItem : null,
            subtotal: subtotal,
        }

        console.log('addedItem: ', addItem)
    })
}

const renderModal = (buttonClicked, data) => {
    const documentBody = document.getElementsByTagName('body');
    const body = Array.from(documentBody)[0];
    const buttonNumber = buttonClicked.id
    data.items.documents[buttonNumber].allowsAdditions === true ?
        body.insertAdjacentHTML('beforeend',
            `
            <div id="modal">
                <div class="flex">
                    <h2 data-item-type=${data.items.documents[buttonNumber].name} id="typeOfItem">${data.items.documents[buttonNumber].name}</h2>
                    <button id="cancelChangesButton">Cancel</button>
                </div>
                <div>
                    <p id="item-subtotal">$${data.items.documents[buttonNumber].basePrice}</p>
                    <input id="numberOfItem" type="number" value="1" min="1" max="25">
                    <div id="additions">
                        ${
                            data.additions.documents.map((addition, index, array) => {
                                return `
                                    <div>
                                        <div>
                                            <input data-checkbox-addition="${addition.name}" data-price="${addition.price}" type="checkbox">${addition.name}
                                        </div>
                                        <p>${addition.price}</p>
                                    </div>
                                `
                            }).join("")
                        }
                    </div>
                    <button id="addItemButton">Add to Cart</button>
                </div>
            </div>
            `
        )
        :
        body.insertAdjacentHTML('beforeend',
            `
            <div id="modal">
                <div>
                    <h2 data-item-type=${data.items.documents[buttonNumber].name} id="typeOfItem">${data.items.documents[buttonNumber].name}</h2>
                    <button id="cancelChangesButton">Cancel</button>
                </div>
                <div>
                    <p>$${data.items.documents[buttonNumber].basePrice}</p>
                    <input id="numberOfItem" type="number" min="1" max="25">
                    <button id="addItemButton">Add to Cart</button>
                </div>
            </div>
            `
        )
    editPrice(buttonClicked, data);
    cancelChanges();
    addItem(data.items.documents[buttonNumber].basePrice);
}

fetch('/get-menu-data')
    .then(response => { return response.json() })
    .then(data => {
        createCategories(data);
        renderCategories(categories);
        renderItems(data);
    })
    .catch((error) => { console.log(error) });
