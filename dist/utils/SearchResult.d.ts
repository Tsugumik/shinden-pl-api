import { AnimeStatus } from "./AnimeStatus.js";
import { AnimeType } from "./AnimeType.js";
export declare class SearchResult {
    private _title;
    private _type;
    private _status;
    private _rating;
    private _seriesURL;
    private _imageURL;
    /**
     * Creates an instance of SearchResult.
     * @param {string} title - The title of the anime.
     * @param {AnimeType} type - The type of the anime (e.g., TV, OVA, Movie).
     * @param {AnimeStatus} status - The status of the anime (e.g., Ongoing, Completed).
     * @param {number} rating - The rating of the anime.
     * @param {URL} seriesURL - The URL to the anime series page.
     * @param {URL} imageURL - The URL of the anime image.
     */
    constructor(title: string, type: AnimeType, status: AnimeStatus, rating: number, seriesURL: URL, imageURL: URL);
    /**
     * Gets the title of the anime.
     * @returns {string} The title of the anime.
     */
    get title(): string;
    /**
     * Gets the type of the anime.
     * @returns {AnimeType} The type of the anime.
     */
    get type(): AnimeType;
    /**
     * Gets the status of the anime.
     * @returns {AnimeStatus} The status of the anime.
     */
    get status(): AnimeStatus;
    /**
     * Gets the rating of the anime.
     * @returns {number} The rating of the anime.
     */
    get rating(): number;
    /**
     * Gets the URL to the anime series page.
     * @returns {URL} The URL to the anime series page.
     */
    get seriesURL(): URL;
}
