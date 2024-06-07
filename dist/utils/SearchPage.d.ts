import { SearchResult } from "./SearchResult.js";
/**
 * class is designed to represent and manage the results of a search query on the Shinden.pl website.
 * It handles the parsing of search result pages,
 * navigation through multiple pages of results,
 * and provides access to the individual search results.
 */
export declare class SearchPage {
    private _name;
    private _pageIndex;
    private _isLast;
    private _isFirst;
    private _totalPages;
    private _searchResults;
    /**
     * Creates an instance of SearchPage.
     * @param {string} name - The name of the search query.
     * @param {SearchPage} [previousPage] - The previous search page.
     * @param {string} [firstPageHTML] - The HTML content of the first search page.
     */
    constructor(name: string, previousPage?: SearchPage, firstPageHTML?: string);
    /**
     * Gets the next page of search results.
     * @returns {Promise<SearchPage>} The next search page.
     * @throws Will throw an error if the current page is the last page.
     */
    getNextPage(): Promise<SearchPage>;
    /**
     * Parses the search page HTML to extract search results.
     * @param {string} [html] - The HTML content of the search page.
     * @private
     */
    private parseSearchPage;
    /**
     * Gets the search results from the current search page.
     * @returns {Promise<SearchResult[]>} The search results from the current search page.
     */
    getSearchResults(): Promise<SearchResult[]>;
}
