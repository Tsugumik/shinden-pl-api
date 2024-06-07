import * as cheerio from 'cheerio';
/**
 * Verifies the HTML content of a fetched page to ensure it is valid.
 *
 * @param {string} html - The HTML content of the fetched page.
 * @returns {Promise<boolean>} A promise that resolves to true if the HTML is verified, otherwise false.
 */
export async function verifyRequest(html) {
    const $ = cheerio.load(html);
    if ($("header.logo").length < 1)
        return false; // Check if the page contains an element with the class "logo" inside a header
    return true;
}
