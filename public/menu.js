let categories = [];

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
                    <button data-menu-item="${item.name}">Add</button>
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
}

const addButtonEventListeners = () => {

    const addButtons = document.querySelectorAll("[data-menu-item]");
    const addButtonsArray = Array.from(addButtons);
    addButtonsArray.forEach((button, index, array) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('button: ', button)
        })
    });
}

fetch('/get-menu-data')
    .then(response => { return response.json() })
    .then(data => {
        createCategories(data);
        renderCategories(categories);
        renderItems(data);
        addButtonEventListeners();
    })
    .catch((error) => { console.log(error) });