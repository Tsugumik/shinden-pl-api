import { Fetcher } from "./fetching/Fetcher.js";
export declare class Player {
    private _online_id;
    private _player;
    private _username;
    private _user_id;
    private _lang_audio;
    private _lang_subs;
    private _max_res;
    private _subs_author;
    private _added;
    private _source;
    private _externalPlayerURL;
    private _fetcher;
    /**
     * Creates an instance of Player.
     * @param {string} online_id - The online ID of the player.
     * @param {string} player - The player type.
     * @param {string} username - The username of the uploader.
     * @param {string | null} user_id - The user ID of the uploader.
     * @param {string} lang_audio - The language of the audio.
     * @param {string} lang_subs - The language of the subtitles.
     * @param {string} max_res - The maximum resolution.
     * @param {string} subs_author - The author of the subtitles.
     * @param {string} added - The date when the player was added.
     * @param {string} source - The source of the player.
     */
    constructor(online_id: string, player: string, username: string, user_id: string | null, lang_audio: string, lang_subs: string, max_res: string, subs_author: string, added: string, source: string, fetcher: Fetcher);
    /**
     * Gets the online ID.
     * @returns {string} The online ID.
     */
    get online_id(): string;
    /**
     * Gets the player type.
     * @returns {string} The player type.
     */
    get player(): string;
    /**
     * Gets the username.
     * @returns {string} The username.
     */
    get username(): string;
    /**
     * Gets the user ID.
     * @returns {string | null} The user ID.
     */
    get user_id(): string | null;
    /**
     * Gets the language of the audio.
     * @returns {string} The language of the audio.
     */
    get lang_audio(): string;
    /**
     * Gets the language of the subtitles.
     * @returns {string} The language of the subtitles.
     */
    get lang_subs(): string;
    /**
     * Gets the maximum resolution.
     * @returns {string} The maximum resolution.
     */
    get max_res(): string;
    /**
     * Gets the author of the subtitles.
     * @returns {string} The author of the subtitles.
     */
    get subs_author(): string;
    /**
     * Gets the date when the player was added.
     * @returns {string} The date when the player was added.
     */
    get added(): string;
    /**
     * Gets the source of the player.
     * @returns {string} The source of the player.
     */
    get source(): string;
    /**
     * Fetches the external player URL e.g. cda.pl or mega.nz.
     * @returns {Promise<URL>} The external player URL.
     */
    getExternalPlayerURL(): Promise<URL>;
}
