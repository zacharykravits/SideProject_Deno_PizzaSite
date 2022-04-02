import { serve } from "./deps.js";
import { config } from "./deps.js";
import { checkForFile } from "./fileExists.js";
import { menuPage } from './menuPage.js';

// .env file
// The .env file is a plain text file that contains information
// that you don't want to share on github or show in my code
// .gitignore
// This file tells git which files to ignore
const { DATA_API_KEY, APP_ID } = config();
// This is the URI that will be queried
const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`
// You also need information about the database, database source (the cluster), and collections
const DATA_SOURCE = 'Cluster0';
const DATABASE = 'pizzaSite';
const COLLECTION_MENU = 'menu';
const COLLECTION_ADDITIONS = 'additions';
const COLLECTION_ORDERS = 'orders';


async function handler(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response(
            await Deno.readFile(`${Deno.cwd()}/public/index.html`), {
                headers: {
                    'Content-Type': 'text/html'
                }
            }
        )
    } else if (url.pathname === '/about' || url.pathname === '/about.html') {
        return new Response(
            await Deno.readFile(`${Deno.cwd()}/public/about.html`), {
                headers: {
                    'Content-Type': 'text/html'
                }
            }
        )
    } else if (url.pathname === '/menu' || url.pathname === '/menu.html') {

        const URI = `${BASE_URI}/find`;

        const query_menu = {
            collection: COLLECTION_MENU,
            database: DATABASE,
            dataSource: DATA_SOURCE
        }

        const query_additions = {
            collection: COLLECTION_ADDITIONS,
            database: DATABASE,
            dataSource: DATA_SOURCE
        }
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': DATA_API_KEY
            }
        }

        options.body = JSON.stringify(query_menu)
        const dataForMenu = await fetch(URI, options)
        console.log('data: ', dataForMenu)
        const menuItems = await dataForMenu.json();
        console.log("menuItems: ", menuItems);

        options.body = JSON.stringify(query_additions)
        const dataForAdditions = await fetch(URI, options);
        console.log('data: ', dataForAdditions)
        const additionItems = await dataForAdditions.json();
        console.log("additionItems: ", additionItems)

        // console.log(config({ safe: true }))

        const menuItemsFromDB = menuItems.documents;
        const additionalItemsFromDB = additionItems.documents;

        return new Response(
            await menuPage(menuItemsFromDB, additionalItemsFromDB), {
                headers: {
                    'Content-Type': 'text/html'
                }
            }
        )
    } else if (url.pathname === '/404' || url.pathname === '/404.html') {
        return new Response(
            await Deno.readFile(`${Deno.cwd()}/public/404.html`), {
                headers: {
                    'Content-Type': 'text/html',
                    'Status': '404 Not Found'
                }
            }
        )
    } else {

        if (await checkForFile(pathname) === false) {
            return Response.redirect('http://localhost:8080/404.html')
        }

        return new Response(
            await Deno.readFile(`${Deno.cwd()}/public${pathname}`)
        )
    }

}

serve(handler, { port: 8080 });