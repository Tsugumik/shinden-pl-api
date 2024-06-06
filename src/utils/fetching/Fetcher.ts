import fetchCookie from "fetch-cookie";
import nodeFetch, { Request, Response } from "node-fetch";
import { verifyRequest } from "./verifyRequest.js";
import { PageType } from "./PageType.js";
import { Anime } from "../Anime.js";
import ShindenHeaders from "../ShindenHeaders.js";

const fetch = fetchCookie(nodeFetch);

/**
 * Fetcher class for retrieving and caching HTML content for shinden.pl pages.
 */
export class Fetcher {
    private _maxRetries = 5;

    private _cachedMainPageHTML: string | undefined = undefined;
    private _cachedEpisodesPageHTML: string | undefined = undefined;
    
    private _isCachedMainPageHTMLHealthy: boolean = false;
    private _isCachedEpisodesPageHTMLHealthy: boolean = false;
    
    private _anime: Anime;

    /**
     * Creates an instance of Fetcher.
     * @param {Anime} anime - The anime object containing URLs.
     * @param {number} [maxRetries] - The maximum number of retries for fetching a page.
     */
    constructor(anime: Anime, maxRetries?: number) {
        if(maxRetries) this._maxRetries = maxRetries;
        this._anime = anime;
    }

    /**
     * Fetches the specified page type and returns the HTML content.
     * @param {PageType} pageType - The type of page to fetch.
     * @returns {Promise<string>} The HTML content of the fetched page.
     * @throws Will throw an error if the page cannot be verified or if the response is not OK.
     */
    async fetchPage(pageType: PageType): Promise<string> {
        let req: Response;
        let status: boolean;
        let req_url: URL;

        // Determine which URL to fetch based on the page type
        switch(pageType) {
            case PageType.ANIME_MAIN:
                if(this._cachedMainPageHTML && this._isCachedMainPageHTMLHealthy) return this._cachedMainPageHTML;
                req_url = this._anime.urlToSeries;
                break;
            case PageType.EPISODES:
                if(this._cachedEpisodesPageHTML && this._isCachedEpisodesPageHTMLHealthy) return this._cachedEpisodesPageHTML;
                req_url = this._anime.urlToEpisodes;
                break;
            default:
                throw new Error("Not implemented!");
        }

        let html: string;

        // Attempt to fetch the page up to the maximum number of retries
        for(let retry=0; retry < 5; retry++) {
            req = await fetch(req_url, {
                headers: new Headers(ShindenHeaders.FRONTEND),
                method: "GET",
                redirect: "follow"
            });
    
            html = await req.text();

            status = await verifyRequest(html);

            if(status && pageType == PageType.ANIME_MAIN) {
                this._isCachedMainPageHTMLHealthy = true; 
                break; 
            } else if(status && pageType == PageType.EPISODES) {
                this._isCachedEpisodesPageHTMLHealthy = true;
                break;
            }
        }

        // Check if the fetch was successful and the page was verified
        if(!status) throw new Error(`Couldn't verify request status after ${this._maxRetries} retries.`);

        if(!req.ok) {
            throw new Error(`Error parsing ${pageType}: response is not OK.`);
        }

        // Cache the fetched HTML content and return it
        switch(pageType) {
            case PageType.ANIME_MAIN:
                this._cachedMainPageHTML = html;
                return html;
            case PageType.EPISODES:
                this._cachedEpisodesPageHTML = html;
                return html;
            default:
                throw new Error("Not implemented!");
        } 
    }

    /**
     * Clears the cached HTML content for both main page and episodes page.
     */
    clearCache() {
        this._cachedMainPageHTML = undefined;
        this._cachedEpisodesPageHTML = undefined;
        this._isCachedMainPageHTMLHealthy = false;
        this._isCachedEpisodesPageHTMLHealthy = false;
    }
}