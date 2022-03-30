// .env file
// The .env file is a plain text file that contains information
// that you don't want to share on github or show in my code
// .gitignore
// This file tells git which files to ignore

import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DATA_API_KEY, APP_ID } = config();

// This is the URI that will be queried
const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`
// You also need information about the database, database source (the cluster), and collections
const DATA_SOURCE = "Cluster0";
const DATABASE = "pizzaSiteProject";
const MENU_COLLECTION = "menu";
const ADDITIONS_COLLECTION = "additions";
const ORDERS_COLLECTION = 'orders';