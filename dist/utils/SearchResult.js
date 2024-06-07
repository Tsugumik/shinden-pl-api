export class SearchResult {
    _title;
    _type;
    _status;
    _rating;
    _seriesURL;
    _imageURL = undefined;
    /**
     * Creates an instance of SearchResult.
     * @param {string} title - The title of the anime.
     * @param {AnimeType} type - The type of the anime (e.g., TV, OVA, Movie).
     * @param {AnimeStatus} status - The status of the anime (e.g., Ongoing, Completed).
     * @param {number} rating - The rating of the anime.
     * @param {URL} seriesURL - The URL to the anime series page.
     * @param {URL} imageURL - The URL of the anime image.
     */
    constructor(title, type, status, rating, seriesURL, imageURL) {
        this._title = title;
        this._type = type;
        this._status = status;
        this._rating = rating;
        this._seriesURL = seriesURL;
        this._imageURL = imageURL;
    }
    /**
     * Gets the title of the anime.
     * @returns {string} The title of the anime.
     */
    get title() {
        return this._title;
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
     * @returns {AnimeStatus} The status of the anime.
     */
    get status() {
        return this._status;
    }
    /**
     * Gets the rating of the anime.
     * @returns {number} The rating of the anime.
     */
    get rating() {
        return this._rating;
    }
    /**
     * Gets the URL to the anime series page.
     * @returns {URL} The URL to the anime series page.
     */
    get seriesURL() {
        return this._seriesURL;
    }
}
