export async function checkForFile(pathname) {

    let pathToTest;
    pathname === '/' ? 
        pathToTest = `${Deno.cwd()}/public/index.html` :
        pathToTest = `${Deno.cwd()}/public${pathname}`
    
    // console.log('pathToTest: ', pathToTest)

    try {
        await Deno.stat(pathToTest);
        return true;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            return false;
        }
    }

}