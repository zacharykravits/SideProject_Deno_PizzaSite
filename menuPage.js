export const menuPage = (categories, menuItems, additionalItems) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="./reset.css">
            <link rel="stylesheet" href="./styles.css">
            <title>Document</title>
        </head>
        <body class="pos-relative">
            <!-- Navigation -->
            <nav id="navigationBar" class="w-full h-10 bor-b-1-black bg-warmgrey-90 border-box pos-fixed">
                <div class="flex justify-content-between align-items-center pt3 pb3 pr5 pl5">
                    <div class="flex align-items-center">
                        <button id="navigationBarMobileToggle" class="navigation-mobile-toggle w-5 flex cols-dir-column gap-2 mr5 hidden-sm">
                            <div class="h-1 w-full bg-white"></div>
                            <div class="h-1 w-full bg-white"></div>
                            <div class="h-1 w-full bg-white"></div>
                        </button>
                        <a href="/" id="navigationBarLogo" class="flex t-no-decoration t-black">
                            <div class="t-mono">
                                <div class=""><p class="t-white pt0 pb0 mt0 mb0">Luigi's Pizza Parlor</p></div>
                            </div>
                        </a>
                        <div class="w-2 h-7 bor-r-1-coolgrey mr5 ml5"></div>
                        <div class="hidden flex-sm">
                            <a class="mr4 t-link" href="/index" >Home</a>
                            <a class="mr4 t-link" href="/menu">Menu</a>
                            <a class="mr4 t-link" href="/about">About</a>
                        </div>
                    </div>
                </div>
                <div id="navigationMobileBackdrop" class="hidden hidden-sm w-fullscreen fade-in">
                    <nav id="navigationMobileDrawer" class="bg-warmgrey-80 w-full h-full fade-in-left">
                        <div class="flex cols-dir-column pl5 pr5 pt7 pb7 border-box">
                            <a class="mb4 t-link" href="/index" >Home</a>
                            <a class="mb4 t-link" href="/menu">Menu</a>
                            <a class="mb4 t-link" href="/about">About</a>
                        </div>  
                    </nav>
                </div>
            </nav>

            <main>
                <div class="pt8 pos-relative t-white">
                    <img src="./indexBgHeroImage.jpg" alt="image of new york style pizza" class="object-fit-cover h-51 w-full">
                    <div class="pos-absolute pos-t-6 pos-z-2 flex w-fullscreen justify-content-around">
                        <div class="t-center flex cols-dir-column gap-3 ">
                            <h1 class="pt8 t-header-6 t-line-height-normal t-center">Truly the best pies in town</h1>
                            <p class="t-header-3 t-line-height-normal t-center">Authentic, memberable, and fresh.</p>
                            <a class="t-underline t-white" href="/menu.html">Order online</a>
                        </div>
                    </div>
                </div>
                <div class="max-width-container m8">
                    ${
                        categories.map((category, index, array) => {
                            return `
                                <div>
                                    <h3>${category}</h3>
                                    <div>
                                        ${
                                            menuItems.map((item, index) => {
                                                if (item.available === true && item.category === category) {

                                                    console.log("basePrice: ", item.basePrice)
                                                    console.log("toString: ", item.basePrice)

                                                    return `
                                                        <div>
                                                            <p>${item.name}</p>
                                                            <p>${item.description}</p>
                                                            <p>${item.basePrice}</p>
                                                            <button class="addToCart" data-name="${item.name}" data-baseprice="${item.basePrice}" data-allowsadditions="${item.allowsAdditions}">Add To Cart</button>
                                                        </div>
                                                    `
                                                }
                                            }).join('')
                                        }
                                    </div>
                                </div>
                            `
                        }).join('')
                    }
                </div>

            </main>
                <div id="addToCartModal" class="hidden pos-absolute pos-z-99 pos-t-4 w-full h-fullscreen bg-black-opacity-40">
                        <form id="addToCartForm" class="bg-white w-full p8">
                            <h2 id="itemName"></h2>
                            <p><span id="itemBasePrice"></span> each</p>
                            <input type="hidden" id="formData-itemName">
                            <input type="hidden" id="formData-itemName">
                            <input type="number" id="count" min="1" max="25" value="1">
                            <div id="itemAdditionsSection" class="hidden">
                                <p>Want to add some toppings?</p>
                                <div id="itemAdditions">
                                    ${
                                        additionalItems.map((addition, index) => {
                                            console.log('addition: ', addition);
                                            return `
                                                <div class="flex">
                                                    <p>${addition.name} (+$${addition.price})</p>
                                                    <input class="additional-item" data-name="${addition.name}" data-price="${addition.price}" type="checkbox">
                                                </div>
                                            `
                                        }).join("")
                                    }
                                </div>
                            </div>
                            <button id="pushToCart">Add</button>
                        </form>
                </div>
            <script src="./navigation.js"></script>
            <script src="./addItem.js"></script>
            <script src="./addToOrder.js"></script>
        </body>
        </html>
        `
}