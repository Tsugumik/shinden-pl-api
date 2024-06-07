import { PageType } from "./PageType.js";
import { Anime } from "../Anime.js";
import { Episode } from "../Episode.js";
import { Player } from "../Player.js";
/**
 * Fetcher class for retrieving and caching HTML content for shinden.pl pages.
 */
export declare class Fetcher {
    private _maxRetries;
    private _cachedMainPageHTML;
    private _cachedEpisodesPageHTML;
    private _cachedPlayersPageHTML;
    private _isCachedMainPageHTMLHealthy;
    private _isCachedEpisodesPageHTMLHealthy;
    private _isCachedPlayersPageHTMLHealthy;
    private _anime;
    /**
     * Creates an instance of Fetcher.
     * @param {Anime} anime - The anime object containing URLs.
     * @param {number} [maxRetries] - The maximum number of retries for fetching a page.
     */
    constructor(anime: Anime, maxRetries?: number);
    /**
     * Fetches the specified page type and returns the HTML content.
     * @param {PageType} pageType - The type of page to fetch.
     * @param {Episode} [episode] - The episode for fetching players page. Only required when pageType == PageType.PLAYERS.
     * @returns {Promise<string>} The HTML content of the fetched page.
     * @throws Will throw an error if the page cannot be verified or if the response is not OK.
     */
    fetchPage(pageType: PageType, episode?: Episode): Promise<string>;
    /**
     * Fetches the external player URL for the given player.
     * @param {Player} player - The player object containing the online ID.
     * @returns {Promise<URL>} The external player URL.
     */
    getExternalPlayerURL(player: Player): Promise<URL>;
    /**
     * Fetches the search results page for a given search query name and page number.
     * @param {string} name - The search query name.
     * @param {number} [page] - The page number to fetch.
     * @param {number} [maxRetries] - The maximum number of retries for fetching the page.
     * @returns {Promise<string>} The HTML content of the search results page.
     */
    static fetchSearchPage(name: string, page?: number, maxRetries?: number): Promise<string>;
    /**
     * Clears the cached HTML content for all pages.
     */
    clearCache(): void;
}
