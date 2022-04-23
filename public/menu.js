let categories = [];

const 

const createCategories = (data) => {
    const items = data.items.documents
    console.log('items: ', items)
    items.map((item, index, array) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
            console.log(item.category)
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

const renderModal = (buttonClicked, data) => {
    const documentBody = document.getElementsByTagName('body');
    const body = Array.from(documentBody)[0];
    const buttonNumber = buttonClicked.id
    console.log("body: ", body);
    console.log("data: ", data)
    data.items.documents[buttonNumber].allowsAdditions === true ?
        body.insertAdjacentHTML('beforeend',
            `
            <div>
                <div class="flex">
                    <h2>${data.items.documents[buttonNumber].name}</h2>
                    <button id="cancelChangesButton">Cancel</button>
                </div>
                <div>
                    <p>Starting at $${data.items.documents[buttonNumber].basePrice}</p>
                    <input type="number" min="1" max="25">
                    <div>

                        ${
                            data.additions.documents.map((addition, index, array) => {
                                return `
                                    <div>
                                        <div>
                                            <input type="checkbox">${addition.name}
                                        </div>
                                        <p>${addition.price}</p>
                                    </div>
                                `
                            }).join("")
                        }
                    </div>
                </div>
            </div>
            `
        )
        :
        body.insertAdjacentHTML('beforeend',
            `
            <div>
                <div>
                    <h2>${data.items.documents[buttonNumber].name}</h2>
                    <button id="cancelChangesButton">Cancel</button>
                </div>
                <div>
                    <p>Starting at $${data.items.documents[buttonNumber].basePrice}</p>
                    <input type="number" min="1" max="25">
                </div>
            </div>
            `
        )
}

fetch('/get-menu-data')
    .then(response => { return response.json() })
    .then(data => {
        createCategories(data);
        renderCategories(categories);
        renderItems(data);
        cancelChanges();
    })
    .catch((error) => { console.log(error) });

