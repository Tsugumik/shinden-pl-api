import { SearchResult } from "./SearchResult.js";
import { Fetcher } from "./fetching/Fetcher.js";
import * as cheerio from 'cheerio';
/**
 * class is designed to represent and manage the results of a search query on the Shinden.pl website.
 * It handles the parsing of search result pages,
 * navigation through multiple pages of results,
 * and provides access to the individual search results.
 */
export class SearchPage {
    _name;
    _pageIndex;
    _isLast;
    _isFirst;
    _totalPages = undefined;
    _searchResults = undefined;
    /**
     * Creates an instance of SearchPage.
     * @param {string} name - The name of the search query.
     * @param {SearchPage} [previousPage] - The previous search page.
     * @param {string} [firstPageHTML] - The HTML content of the first search page.
     */
    constructor(name, previousPage, firstPageHTML) {
        if (firstPageHTML) {
            const $ = cheerio.load(firstPageHTML);
            const LP_URL = new URL("https://shinden.pl" + $('a[rel="last"]').attr("href"));
            this._totalPages = Number(LP_URL.searchParams.get("page"));
            this.parseSearchPage(firstPageHTML);
        }
        this._name = name;
        if (previousPage) {
            this._pageIndex = previousPage._pageIndex + 1;
            this._totalPages = previousPage._totalPages;
            this._isFirst = false;
        }
        else {
            this._pageIndex = 1;
            this._isFirst = true;
        }
        if (this._pageIndex == this._totalPages) {
            this._isLast = true;
        }
    }
    /**
     * Gets the next page of search results.
     * @returns {Promise<SearchPage>} The next search page.
     * @throws Will throw an error if the current page is the last page.
     */
    async getNextPage() {
        if (this._isLast) {
            throw new Error("This is the last page.");
        }
        return new SearchPage(this._name, this);
    }
    /**
     * Parses the search page HTML to extract search results.
     * @param {string} [html] - The HTML content of the search page.
     * @private
     */
    async parseSearchPage(html) {
        let rHtml = html ? html : await Fetcher.fetchSearchPage(this._name, this._pageIndex);
        const $ = cheerio.load(rHtml);
        const RESULT = new Array();
        $("ul.div-row").each(async (_i, data) => {
            if (_i == 0)
                return;
            let title, status, rating, series_url, imageURL, animeType;
            const DESC_COL = $(data).find("li.desc-col");
            title = DESC_COL.find("h3").text();
            series_url = new URL("https://shinden.pl" + DESC_COL.find("a").attr("href"));
            animeType = $("li.title-kind-col").text();
            status = $(data).find("li.title-status-col").text();
            rating = Number($(data).find("li.rate-top").text().replace(",", "."));
            let img = $(data).find(".cover-col").find("a").attr("href");
            if (img == "javascript:void(0)") {
                imageURL = new URL("https://shinden.pl/res/other/placeholders/title/100x100.jpg");
            }
            else {
                imageURL = new URL("https://shinden.pl" + img);
            }
            RESULT.push(new SearchResult(title, animeType, status, rating, series_url, imageURL));
        });
        this._searchResults = RESULT;
    }
    /**
     * Gets the search results from the current search page.
     * @returns {Promise<SearchResult[]>} The search results from the current search page.
     */
    async getSearchResults() {
        if (this._searchResults) {
            return this._searchResults;
        }
        else {
            await this.parseSearchPage();
        }
        return this._searchResults;
    }
}
