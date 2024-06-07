import * as cheerio from 'cheerio';
export default async function verifyRequest(html) {
    const $ = cheerio.load(html);
    if ($("header.logo").length < 1)
        return false;
    return true;
}
