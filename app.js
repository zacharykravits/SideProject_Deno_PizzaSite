import { serve } from "./deps.js";
import { checkForFile } from "./fileExists.js";

async function handler(request) {
    const url = new URL(request.url);
    let pathname;
    url.pathname === '/' ?
        pathname = '/index.html' :
        pathname = url.pathname;
    const pathnameExtension = url.pathname.split('.')[1];
    const path = `${Deno.cwd()}/public${pathname}`;

    if (await checkForFile(path, pathname)) {
        const staticFile = await Deno.readFile(path);
        return new Response(staticFile)
    }

    return new Response(
        await Deno.readFile(`${Deno.cwd()}/public${pathname}.${pathnameExtension}`)
    )
}

serve(handler, { port: 8080 });