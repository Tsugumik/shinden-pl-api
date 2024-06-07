export class Player {
    _online_id;
    _player;
    _username;
    _user_id;
    _lang_audio;
    _lang_subs;
    _max_res;
    _subs_author;
    _added;
    _source;
    _externalPlayerURL = undefined;
    _fetcher;
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
    constructor(online_id, player, username, user_id, lang_audio, lang_subs, max_res, subs_author, added, source, fetcher) {
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
    get online_id() {
        return this._online_id;
    }
    /**
     * Gets the player type.
     * @returns {string} The player type.
     */
    get player() {
        return this._player;
    }
    /**
     * Gets the username.
     * @returns {string} The username.
     */
    get username() {
        return this._username;
    }
    /**
     * Gets the user ID.
     * @returns {string | null} The user ID.
     */
    get user_id() {
        return this._user_id;
    }
    /**
     * Gets the language of the audio.
     * @returns {string} The language of the audio.
     */
    get lang_audio() {
        return this._lang_audio;
    }
    /**
     * Gets the language of the subtitles.
     * @returns {string} The language of the subtitles.
     */
    get lang_subs() {
        return this._lang_subs;
    }
    /**
     * Gets the maximum resolution.
     * @returns {string} The maximum resolution.
     */
    get max_res() {
        return this._max_res;
    }
    /**
     * Gets the author of the subtitles.
     * @returns {string} The author of the subtitles.
     */
    get subs_author() {
        return this._subs_author;
    }
    /**
     * Gets the date when the player was added.
     * @returns {string} The date when the player was added.
     */
    get added() {
        return this._added;
    }
    /**
     * Gets the source of the player.
     * @returns {string} The source of the player.
     */
    get source() {
        return this._source;
    }
    /**
     * Fetches the external player URL e.g. cda.pl or mega.nz.
     * @returns {Promise<URL>} The external player URL.
     */
    async getExternalPlayerURL() {
        if (this._externalPlayerURL) {
            return this._externalPlayerURL;
        }
        else {
            this._externalPlayerURL = await this._fetcher.getExternalPlayerURL(this);
            return this._externalPlayerURL;
        }
    }
}
