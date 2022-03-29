export async function checkForFile(path, pathname) {
    try {
        const stats = await Deno.stat(path);
        return stats
    } catch(error) {
        if (error && error instanceof Deno.errors.NotFound) {
            return false;
        } else {
            throw error;
        }
    }
}