/**
 * Verifies the HTML content of a fetched page to ensure it is valid.
 *
 * @param {string} html - The HTML content of the fetched page.
 * @returns {Promise<boolean>} A promise that resolves to true if the HTML is verified, otherwise false.
 */
export declare function verifyRequest(html: string): Promise<boolean>;
