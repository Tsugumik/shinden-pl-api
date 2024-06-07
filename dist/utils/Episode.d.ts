import { Player } from "./Player.js";
import { Fetcher } from "./fetching/Fetcher.js";
export declare class Episode {
    private _title;
    private _emissionDate;
    private _languages;
    private _fetcher;
    private _players;
    private _playersURL;
    /**
     * Creates an instance of Episode.
     * @param {string} title - The title of the episode.
     * @param {string} emissionDate - The emission date of the episode.
     * @param {string[]} languages - The languages available for the episode.
     * @param {URL | null} playersURL - The URL to the players page.
     * @param {Fetcher} fetcher - The fetcher instance used for retrieving page data.
     */
    constructor(title: string, emissionDate: string, languages: string[], playersURL: URL | null, fetcher: Fetcher);
    /**
     * Gets the title of the episode.
     * @returns {string} The title of the episode.
     */
    get title(): string;
    /**
     * Gets the emission date of the episode.
     * @returns {string} The emission date of the episode.
     */
    get emissionDate(): string;
    /**
     * Gets the languages available for the episode.
     * @returns {string[]} The languages available for the episode.
     */
    get languages(): string[];
    /**
     * Gets the URL to the players page.
     * @returns {URL | null} The URL to the players page.
     */
    get playersURL(): URL | null;
    /**
     * Parses the players page to extract player information.
     */
    private parsePlayersPage;
    /**
     * Returns the list of players for the episode.
     * @returns {Promise<Player[]>} A promise that resolves to an array of Player objects.
     */
    getPlayers(): Promise<Player[]>;
}
