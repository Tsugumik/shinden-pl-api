/**
 * Class representing the statistics of an anime.
 */
export class AnimeStats {
    protected _currentlyWatching: number;
    private _viewed: number;
    private _skipped: number;
    private _onHold: number;
    private _abandoned: number;
    private _plansToWatch: number;
    private _likes: number;

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
    constructor(
        currentlyWatching: number,
        viewed: number,
        skipped: number,
        onHold: number,
        abandoned: number,
        plansToWatch: number,
        likes: number
    ) {
        this._currentlyWatching = currentlyWatching;
        this._viewed = viewed;
        this._skipped = skipped;
        this._onHold = onHold;
        this._abandoned = abandoned;
        this._plansToWatch = plansToWatch;
        this._likes = likes;
    }

    /**
     * Gets the number of users currently watching the anime.
     * @returns {number} The number of users currently watching.
     */
    get currentlyWatching(): number {
        return this._currentlyWatching;
    }

    /**
     * Gets the number of users who have viewed the anime.
     * @returns {number} The number of users who have viewed.
     */
    get viewed(): number {
        return this._viewed;
    }

    /**
     * Gets the number of users who have skipped the anime.
     * @returns {number} The number of users who have skipped.
     */
    get skipped(): number {
        return this._skipped;
    }

    /**
     * Gets the number of users who have put the anime on hold.
     * @returns {number} The number of users who have put on hold.
     */
    get onHold(): number {
        return this._onHold;
    }

    /**
     * Gets the number of users who have abandoned the anime.
     * @returns {number} The number of users who have abandoned.
     */
    get abandoned(): number {
        return this._abandoned;
    }

    /**
     * Gets the number of users who plan to watch the anime.
     * @returns {number} The number of users who plan to watch.
     */
    get plansToWatch(): number {
        return this._plansToWatch;
    }

    /**
     * Gets the number of likes the anime has received.
     * @returns {number} The number of likes.
     */
    get likes(): number {
        return this._likes;
    }
}