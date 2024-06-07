/**
 * Class representing the statistics of an anime.
 */
export declare class AnimeStats {
    protected _currentlyWatching: number;
    private _viewed;
    private _skipped;
    private _onHold;
    private _abandoned;
    private _plansToWatch;
    private _likes;
    /**
     * Creates an instance of AnimeStats.
     * @param {number} currentlyWatching - The number of users currently watching the anime.
     * @param {number} viewed - The number of users who have viewed the anime.
     * @param {number} skipped - The number of users who have skipped the anime.
     * @param {number} onHold - The number of users who have put the anime on hold.
     * @param {number} abandoned - The number of users who have abandoned the anime.
     * @param {number} plansToWatch - The number of users who plan to watch the anime.
     * @param {number} likes - The number of likes the anime has received.
     */
    constructor(currentlyWatching: number, viewed: number, skipped: number, onHold: number, abandoned: number, plansToWatch: number, likes: number);
    /**
     * Gets the number of users currently watching the anime.
     * @returns {number} The number of users currently watching.
     */
    get currentlyWatching(): number;
    /**
     * Gets the number of users who have viewed the anime.
     * @returns {number} The number of users who have viewed.
     */
    get viewed(): number;
    /**
     * Gets the number of users who have skipped the anime.
     * @returns {number} The number of users who have skipped.
     */
    get skipped(): number;
    /**
     * Gets the number of users who have put the anime on hold.
     * @returns {number} The number of users who have put on hold.
     */
    get onHold(): number;
    /**
     * Gets the number of users who have abandoned the anime.
     * @returns {number} The number of users who have abandoned.
     */
    get abandoned(): number;
    /**
     * Gets the number of users who plan to watch the anime.
     * @returns {number} The number of users who plan to watch.
     */
    get plansToWatch(): number;
    /**
     * Gets the number of likes the anime has received.
     * @returns {number} The number of likes.
     */
    get likes(): number;
}
