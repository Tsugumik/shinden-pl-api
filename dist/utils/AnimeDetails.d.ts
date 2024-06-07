import { AnimeStatus } from "./AnimeStatus.js";
import { AnimeType } from "./AnimeType.js";
/**
 * Class representing the details of an anime.
 */
export declare class AnimeDetails {
    private _type;
    private _status;
    private _aired;
    private _ended;
    private _episodes;
    private _producers;
    private _durationPerEpisodeInMinutes;
    private _MPAA;
    /**
     * Creates an instance of AnimeDetails.
     * @param {AnimeType} anime_type - The type of the anime (e.g., TV, OVA, Movie).
     * @param {AnimeStatus} status - The status of the anime (e.g., ongoing, completed).
     * @param {string | null} aired - The date when the anime first aired.
     * @param {string | null} ended - The date when the anime ended.
     * @param {number | null} episodes - The total number of episodes.
     * @param {Array<string>} producers - The list of producers.
     * @param {number | null} durationPerEpisodeInMinutes - The duration of each episode in minutes.
     * @param {string | null} MPAA - The MPAA rating of the anime.
     */
    constructor(anime_type: AnimeType, status: AnimeStatus, aired: string | null, ended: string | null, episodes: number | null, producers: Array<string>, durationPerEpisodeInMinutes: number | null, MPAA: string | null);
    /**
     * Gets the type of the anime.
     * @returns {AnimeType} The type of the anime.
     */
    get type(): AnimeType;
    /**
     * Gets the status of the anime.
     * @returns {string} The status of the anime.
     */
    get status(): AnimeStatus;
    /**
     * Gets the date when the anime first aired.
     * @returns {string | null} The date when the anime first aired.
     */
    get aired(): string | null;
    /**
     * Gets the date when the anime ended.
     * @returns {string | null} The date when the anime ended.
     */
    get ended(): string | null;
    /**
     * Gets the total number of episodes.
     * @returns {number | null} The total number of episodes.
     */
    get episodes(): number | null;
    /**
     * Gets the list of producers.
     * @returns {Array<string>} The list of producers.
     */
    get producers(): Array<string>;
    /**
     * Gets the duration of each episode in minutes.
     * @returns {number | null} The duration of each episode in minutes.
     */
    get durationPerEpisodeInMinutes(): number | null;
    /**
     * Gets the MPAA rating of the anime.
     * @returns {string | null} The MPAA rating of the anime.
     */
    get MPAA(): string | null;
}
