import { serve } from "./deps.js";
import { checkForFile } from "./fileExists.js";

async function handler(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const path = `${Deno.cwd()}/public${pathname}`;

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
        return new Response(
            await Deno.readFile(`${Deno.cwd()}/public/menu.html`), {
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