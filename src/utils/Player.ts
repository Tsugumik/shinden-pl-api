import { Fetcher } from "./fetching/Fetcher.js";

export class Player {
    private _online_id: string;
    private _player: string;
    private _username: string;
    private _user_id: string | null;
    private _lang_audio: string;
    private _lang_subs: string;
    private _max_res: string;
    private _subs_author: string;    
    private _added: string;
    private _source: string;
    private _externalPlayerURL: URL | undefined = undefined;

    private _fetcher: Fetcher;

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
    constructor(
        online_id: string,
        player: string,
        username: string,
        user_id: string | null,
        lang_audio: string,
        lang_subs: string,
        max_res: string,
        subs_author: string,
        added: string,
        source: string,
        fetcher: Fetcher
    ) {
        this._online_id = online_id;
        this._player = player;
        this._username = username;
        this._user_id = user_id;
        this._lang_audio = lang_audio;
        this._lang_subs = lang_subs;
        this._max_res = max_res;
        this._subs_author = subs_author;
        this._added = added;
        this._source = source;
        this._fetcher = fetcher;
    }

    /**
     * Gets the online ID.
     * @returns {string} The online ID.
     */
    get online_id(): string {
        return this._online_id;
    }

    /**
     * Gets the player type.
     * @returns {string} The player type.
     */
    get player(): string {
        return this._player;
    }

    /**
     * Gets the username.
     * @returns {string} The username.
     */
    get username(): string {
        return this._username;
    }

    /**
     * Gets the user ID.
     * @returns {string | null} The user ID.
     */
    get user_id(): string | null {
        return this._user_id;
    }

    /**
     * Gets the language of the audio.
     * @returns {string} The language of the audio.
     */
    get lang_audio(): string {
        return this._lang_audio;
    }

    /**
     * Gets the language of the subtitles.
     * @returns {string} The language of the subtitles.
     */
    get lang_subs(): string {
        return this._lang_subs;
    }

    /**
     * Gets the maximum resolution.
     * @returns {string} The maximum resolution.
     */
    get max_res(): string {
        return this._max_res;
    }

    /**
     * Gets the author of the subtitles.
     * @returns {string} The author of the subtitles.
     */
    get subs_author(): string {
        return this._subs_author;
    }

    /**
     * Gets the date when the player was added.
     * @returns {string} The date when the player was added.
     */
    get added(): string {
        return this._added;
    }

    /**
     * Gets the source of the player.
     * @returns {string} The source of the player.
     */
    get source(): string {
        return this._source;
    }

    /**
     * Fetches the external player URL e.g. cda.pl or mega.nz.
     * @returns {Promise<URL>} The external player URL.
     */
    async getExternalPlayerURL(): Promise<URL> {
        if(this._externalPlayerURL) {
            return this._externalPlayerURL;
        } else {
            this._externalPlayerURL = await this._fetcher.getExternalPlayerURL(this);
            return this._externalPlayerURL;
        }
    }

}