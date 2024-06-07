/**
 * Class representing the details of an anime.
 */
export class AnimeDetails {
    _type;
    _status;
    _aired;
    _ended;
    _episodes;
    _producers;
    _durationPerEpisodeInMinutes;
    _MPAA;
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
    constructor(anime_type, status, aired, ended, episodes, producers, durationPerEpisodeInMinutes, MPAA) {
        this._type = anime_type;
        this._status = status;
        this._aired = aired;
        this._ended = ended;
        this._episodes = episodes;
        this._producers = producers;
        this._durationPerEpisodeInMinutes = durationPerEpisodeInMinutes;
        this._MPAA = MPAA;
    }
    /**
     * Gets the type of the anime.
     * @returns {AnimeType} The type of the anime.
     */
    get type() {
        return this._type;
    }
    /**
     * Gets the status of the anime.
     * @returns {string} The status of the anime.
     */
    get status() {
        return this._status;
    }
    /**
     * Gets the date when the anime first aired.
     * @returns {string | null} The date when the anime first aired.
     */
    get aired() {
        return this._aired;
    }
    /**
     * Gets the date when the anime ended.
     * @returns {string | null} The date when the anime ended.
     */
    get ended() {
        return this._ended;
    }
    /**
     * Gets the total number of episodes.
     * @returns {number | null} The total number of episodes.
     */
    get episodes() {
        return this._episodes;
    }
    /**
     * Gets the list of producers.
     * @returns {Array<string>} The list of producers.
     */
    get producers() {
        return this._producers;
    }
    /**
     * Gets the duration of each episode in minutes.
     * @returns {number | null} The duration of each episode in minutes.
     */
    get durationPerEpisodeInMinutes() {
        return this._durationPerEpisodeInMinutes;
    }
    /**
     * Gets the MPAA rating of the anime.
     * @returns {string | null} The MPAA rating of the anime.
     */
    get MPAA() {
        return this._MPAA;
    }
}
;
