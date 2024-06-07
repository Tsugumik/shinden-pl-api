import fetchCookie from "fetch-cookie";
import nodeFetch from "node-fetch";
import { verifyRequest } from "./verifyRequest.js";
import ShindenHeaders from "../ShindenHeaders.js";
import * as cheerio from 'cheerio';
const fetch = fetchCookie(nodeFetch);
/**
 * Fetcher class for retrieving and caching HTML content for shinden.pl pages.
 */
export class Fetcher {
    _maxRetries = 5;
    _cachedMainPageHTML = undefined;
    _cachedEpisodesPageHTML = undefined;
    _cachedPlayersPageHTML = undefined;
    _isCachedMainPageHTMLHealthy = false;
    _isCachedEpisodesPageHTMLHealthy = false;
    _isCachedPlayersPageHTMLHealthy = false;
    _anime;
    /**
     * Creates an instance of Fetcher.
     * @param {Anime} anime - The anime object containing URLs.
     * @param {number} [maxRetries] - The maximum number of retries for fetching a page.
     */
    constructor(anime, maxRetries) {
        if (maxRetries)
            this._maxRetries = maxRetries;
        this._anime = anime;
    }
    /**
     * Fetches the specified page type and returns the HTML content.
     * @param {PageType} pageType - The type of page to fetch.
     * @param {Episode} [episode] - The episode for fetching players page. Only required when pageType == PageType.PLAYERS.
     * @returns {Promise<string>} The HTML content of the fetched page.
     * @throws Will throw an error if the page cannot be verified or if the response is not OK.
     */
    async fetchPage(pageType, episode) {
        let req;
        let status;
        let req_url;
        // Determine which URL to fetch based on the page type
        switch (pageType) {
            case "main page" /* PageType.ANIME_MAIN */:
                if (this._cachedMainPageHTML && this._isCachedMainPageHTMLHealthy)
                    return this._cachedMainPageHTML;
                req_url = this._anime.urlToSeries;
                break;
            case "episodes page" /* PageType.EPISODES */:
                if (this._cachedEpisodesPageHTML && this._isCachedEpisodesPageHTMLHealthy)
                    return this._cachedEpisodesPageHTML;
                req_url = this._anime.urlToEpisodes;
                break;
            case "players page" /* PageType.PLAYERS */:
                if (this._cachedPlayersPageHTML && this._isCachedPlayersPageHTMLHealthy)
                    return this._cachedPlayersPageHTML;
                if (!episode)
                    throw new Error("When fetching players, you need to specify the episode argument!");
                req_url = episode.playersURL;
                break;
            default:
                throw new Error("Not implemented!");
        }
        let html;
        // Attempt to fetch the page up to the maximum number of retries
        for (let retry = 0; retry < 5; retry++) {
            req = await fetch(req_url, {
                headers: new Headers(ShindenHeaders.FRONTEND),
                method: "GET",
                redirect: "follow"
            });
            html = await req.text();
            status = await verifyRequest(html);
            if (status && pageType == "main page" /* PageType.ANIME_MAIN */) {
                this._isCachedMainPageHTMLHealthy = true;
                break;
            }
            else if (status && pageType == "episodes page" /* PageType.EPISODES */) {
                this._isCachedEpisodesPageHTMLHealthy = true;
                break;
            }
            else if (status && pageType == "players page" /* PageType.PLAYERS */) {
                this._isCachedPlayersPageHTMLHealthy = true;
                break;
            }
        }
        // Check if the fetch was successful and the page was verified
        if (!status)
            throw new Error(`Couldn't verify request status after ${this._maxRetries} retries.`);
        if (!req.ok) {
            throw new Error(`Error parsing ${pageType}: response is not OK.`);
        }
        // Cache the fetched HTML content and return it
        switch (pageType) {
            case "main page" /* PageType.ANIME_MAIN */:
                this._cachedMainPageHTML = html;
                return html;
            case "episodes page" /* PageType.EPISODES */:
                this._cachedEpisodesPageHTML = html;
                return html;
            case "players page" /* PageType.PLAYERS */:
                this._cachedPlayersPageHTML = html;
                return html;
            default:
                throw new Error("Not implemented!");
        }
    }
    /**
     * Fetches the external player URL for the given player.
     * @param {Player} player - The player object containing the online ID.
     * @returns {Promise<URL>} The external player URL.
     */
    async getExternalPlayerURL(player) {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const URL_1 = `https://api4.shinden.pl/xhr/${player.online_id}/player_load?auth=X2d1ZXN0XzowLDUsMjEwMDAwMDAsMjU1LDQxNzQyOTM2NDQ%3D`;
        const URL_2 = `https://api4.shinden.pl/xhr/${player.online_id}/player_show?auth=X2d1ZXN0XzowLDUsMjEwMDAwMDAsMjU1LDQxNzQyOTM2NDQ%3D&width=0&height=-1`;
        await fetch(URL_1, {
            method: "GET",
            headers: ShindenHeaders.API
        });
        // Make the second request after 5 seconds (shinden.pl API requirements)
        await sleep(5000);
        const DATA = await fetch(URL_2, {
            method: "GET",
            headers: ShindenHeaders.API
        });
        const HTML = await DATA.text();
        const $ = cheerio.load(HTML);
        const SRC = $("iframe").attr("src");
        return new URL(SRC.startsWith("//") ? SRC.replace("//", "https://") : SRC);
    }
    /**
     * Fetches the search results page for a given search query name and page number.
     * @param {string} name - The search query name.
     * @param {number} [page] - The page number to fetch.
     * @param {number} [maxRetries] - The maximum number of retries for fetching the page.
     * @returns {Promise<string>} The HTML content of the search results page.
     */
    static async fetchSearchPage(name, page, maxRetries) {
        let req;
        let html;
        let status;
        let _maxRetries = maxRetries ? maxRetries : 5;
        const REQ_URL = new URL("https://shinden.pl/series");
        REQ_URL.searchParams.append("search", name);
        if (page && page > 1)
            REQ_URL.searchParams.append("page", page.toString());
        for (let retry = 0; retry < 5; retry++) {
            req = await fetch(REQ_URL, {
                headers: new Headers(ShindenHeaders.FRONTEND),
                method: "GET",
                redirect: "follow"
            });
            html = await req.text();
            status = await verifyRequest(html);
        }
        // Check if the fetch was successful and the page was verified
        if (!status)
            throw new Error(`Couldn't verify request status after ${_maxRetries} retries.`);
        if (!req.ok) {
            throw new Error(`Error parsing search page: response is not OK.`);
        }
        return html;
    }
    /**
     * Clears the cached HTML content for all pages.
     */
    clearCache() {
        this._cachedMainPageHTML = undefined;
        this._cachedEpisodesPageHTML = undefined;
        this._cachedPlayersPageHTML = undefined;
        this._isCachedMainPageHTMLHealthy = false;
        this._isCachedEpisodesPageHTMLHealthy = false;
        this._isCachedPlayersPageHTMLHealthy = false;
    }
}
