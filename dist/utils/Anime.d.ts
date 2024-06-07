import { AnimeStats } from "./AnimeStats.js";
import { AnimeDetails } from "./AnimeDetails.js";
import { Episode } from "./Episode.js";
/**
 * Class representing an anime, including its details and statistics.
 */
export declare class Anime {
    private _urlToSeries;
    private _urlToEpisodes;
    private _loginRequiredStatus;
    private _fetcher;
    private _rating;
    private _imageURL;
    private _description;
    private _title;
    private _stats;
    private _details;
    private _episodes;
    /**
     * Checks if the anime is available.
     * @throws Will throw an error if the anime is not available.
     */
    private checkAvailability;
    /**
     * Parses the main page of the anime to extract details.
     * @throws Will throw an error if required data is missing.
     */
    private parseMainPage;
    /**
     * Checks the validity of the provided URL.
     * @param {URL} [url] - The URL to check.
     * @throws Will throw an error if the URL is invalid.
     */
    checkURL(url?: URL): Promise<void>;
    /**
     * Gets the rating of the anime.
     * @returns {Promise<number>} The rating of the anime.
     */
    getRating(): Promise<number>;
    /**
     * Gets the image URL of the anime.
     * @returns {Promise<URL>} The image URL of the anime.
     */
    getImageURL(): Promise<URL>;
    /**
     * Gets the title of the anime.
     * @returns {Promise<string>} The title of the anime.
     */
    getTitle(): Promise<string>;
    /**
     * Gets the description of the anime.
     * @returns {Promise<string>} The description of the anime.
     */
    getDescription(): Promise<string>;
    /**
     * Gets the statistics of the anime.
     * @returns {Promise<AnimeStats>} The statistics of the anime.
     */
    getStats(): Promise<AnimeStats>;
    /**
     * Gets the details of the anime.
     * @returns {Promise<AnimeDetails>} The details of the anime.
     */
    getDetails(): Promise<AnimeDetails>;
    /**
     * Parses the episodes page of the anime to extract episodes details.
     */
    private parseEpisodesPage;
    /**
     * Gets the episodes of the anime.
     * @returns {Promise<Episode[]>} The episodes of the anime.
     */
    getEpisodes(): Promise<Episode[]>;
    /**
     * Gets the login required status for the anime.
     * @returns {boolean} True if login is required, false otherwise.
     */
    get isLoginRequired(): boolean;
    /**
     * Gets the URL to the anime series.
     * @returns {URL} The URL to the anime series.
     */
    get urlToSeries(): URL;
    /**
    * Gets the URL to the anime episodes.
    * @returns {URL} The URL to the anime episodes.
    */
    get urlToEpisodes(): URL;
    /**
     * Creates an instance of Anime.
     * @param {string} urlToSeries - The URL to the anime series e.g. https://shinden.pl/series/12434-hunter-x-hunter-2011
     * @param {number} [maxRetries] - The maximum number of retries for fetching pages.
     */
    constructor(urlToSeries: string, maxRetries?: number);
}
