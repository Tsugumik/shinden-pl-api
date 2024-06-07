import { SearchPage } from "./utils/SearchPage.js";
import { Fetcher } from "./utils/fetching/Fetcher.js";
export async function searchAnime(name) {
    const HTML = await Fetcher.fetchSearchPage(name);
    return new SearchPage(name, null, HTML);
}
