import * as cheerio from 'cheerio';
import { Fetcher } from "./fetching/Fetcher.js";
import { AnimeStats } from "./AnimeStats.js";
import { AnimeDetails } from "./AnimeDetails.js";
import { Episode } from "./Episode.js";
/**
 * Class representing an anime, including its details and statistics.
 */
export class Anime {
    // Utils
    _urlToSeries;
    _urlToEpisodes;
    _loginRequiredStatus = undefined;
    _fetcher;
    // Data
    _rating = undefined;
    _imageURL = undefined;
    _description = undefined;
    _title = undefined;
    _stats = undefined;
    _details = undefined;
    _episodes = undefined;
    /**
     * Checks if the anime is available.
     * @throws Will throw an error if the anime is not available.
     */
    async checkAvailability() {
        try {
            await this._fetcher.fetchPage("main page" /* PageType.ANIME_MAIN */);
        }
        catch (e) {
            throw new Error(`${this._urlToSeries} is not available on shinden.pl! Fetcher error: ${e}`);
        }
    }
    /**
     * Parses the main page of the anime to extract details.
     * @throws Will throw an error if required data is missing.
     */
    async parseMainPage() {
        const HTML = await this._fetcher.fetchPage("main page" /* PageType.ANIME_MAIN */);
        const $ = cheerio.load(HTML);
        this._description = $("#description").find("p").text();
        if (this._description == undefined)
            throw new Error("Error parsing main page: description is undefined!");
        if (this.isLoginRequired) {
            this._imageURL = new URL("https://shinden.pl/res/other/placeholders/title/100x100.jpg");
        }
        else {
            const IMG_PATH = $("section.title-cover").find("img.info-aside-img").attr("src");
            if (IMG_PATH == undefined)
                throw new Error("Error parsing main page: imageURL is undefined!");
            this._imageURL = new URL("https://shinden.pl" + IMG_PATH);
        }
        this._rating = Number($("span.info-aside-rating-user").text().replace(",", "."));
        this._title = $("span.title").text();
        if (this._title == undefined)
            throw new Error("Error parsing main page: title is undefined!");
        const STATS = new Array();
        const DETAILS_TEXT = new Array();
        const DETAILS_VALUE = new Array();
        $("section.title-small-info").find("dt").each(async (_i, data) => {
            DETAILS_TEXT.push($(data).text().replace(":", ""));
        });
        $("section.title-small-info").find("dd").each(async (_i, data) => {
            DETAILS_VALUE.push($(data).text());
        });
        $("section.title-stats").find("dd").each(async (_i, data) => {
            STATS.push(Number($(data).text()));
        });
        if (STATS.length < 7)
            throw new Error("Error parsing main page: stats array length < 7");
        this._stats = new AnimeStats(STATS[0], STATS[1], STATS[2], STATS[3], STATS[4], STATS[5], STATS[6]);
        let _type;
        let _status;
        let _aired = null;
        let _ended = null;
        let _episodes = null;
        let _producers = new Array();
        let _durationPerEpisodeInMinutes = null;
        let _MPAA = null;
        for (let i = 0; i < DETAILS_TEXT.length; i++) {
            switch (DETAILS_TEXT[i]) {
                case "Typ" /* AnimeDetailsType.TYPE */:
                    _type = DETAILS_VALUE[i];
                    break;
                case "Status" /* AnimeDetailsType.STATUS */:
                    _status = DETAILS_VALUE[i];
                    break;
                case "Data emisji" /* AnimeDetailsType.AIRED */:
                    _aired = DETAILS_VALUE[i];
                    break;
                case "Koniec emisji" /* AnimeDetailsType.ENDED */:
                    _ended = DETAILS_VALUE[i];
                    break;
                case "Liczba odcink\u00F3w" /* AnimeDetailsType.EPISODES */:
                    _episodes = Number(DETAILS_VALUE[i]);
                    break;
                case "Studio" /* AnimeDetailsType.PRODUCERS */:
                    DETAILS_VALUE[i].split(",").forEach(e => {
                        const PRODUCER = e.replace("\n", "");
                        if (PRODUCER.length > 0)
                            _producers.push(PRODUCER);
                    });
                    break;
                case "D\u0142ugo\u015B\u0107 odcinka" /* AnimeDetailsType.DURATION_PER_EPISODE_IN_MINUTES */:
                    _durationPerEpisodeInMinutes = Number(DETAILS_VALUE[i].replace("min", ""));
                    break;
                case "MPAA" /* AnimeDetailsType.MPAA */:
                    _MPAA = DETAILS_VALUE[i];
                    break;
                default:
                    throw new Error(`Parsing not implemented for detail: ${DETAILS_TEXT[i]}`);
            }
        }
        this._details = new AnimeDetails(_type, _status, _aired, _ended, _episodes, _producers, _durationPerEpisodeInMinutes, _MPAA);
    }
    /**
     * Checks the validity of the provided URL.
     * @param {URL} [url] - The URL to check.
     * @throws Will throw an error if the URL is invalid.
     */
    async checkURL(url) {
        let checkURL;
        if (url) {
            checkURL = url;
        }
        else {
            checkURL = this._urlToSeries;
        }
        if (checkURL.origin != "https://shinden.pl") {
            throw new Error("Invalid origin. URL must be from 'https://shinden.pl'");
        }
        else if (!(checkURL.pathname.startsWith('/series/') || checkURL.pathname.startsWith('/titles/'))) {
            throw new Error("Invalid pathname. URL must start with '/series/' or '/titles/'");
        }
        else if (checkURL.pathname.startsWith('/titles/')) {
            this._loginRequiredStatus = true;
        }
        else {
            this._loginRequiredStatus = false;
        }
    }
    /**
     * Gets the rating of the anime.
     * @returns {Promise<number>} The rating of the anime.
     */
    async getRating() {
        if (this._rating) {
            return this._rating;
        }
        else {
            await this.parseMainPage();
        }
        return this._rating;
    }
    /**
     * Gets the image URL of the anime.
     * @returns {Promise<URL>} The image URL of the anime.
     */
    async getImageURL() {
        if (this._imageURL) {
            return this._imageURL;
        }
        else {
            await this.parseMainPage();
        }
        return this._imageURL;
    }
    /**
     * Gets the title of the anime.
     * @returns {Promise<string>} The title of the anime.
     */
    async getTitle() {
        if (this._title) {
            return this._title;
        }
        else {
            await this.parseMainPage();
        }
        return this._title;
    }
    /**
     * Gets the description of the anime.
     * @returns {Promise<string>} The description of the anime.
     */
    async getDescription() {
        if (this._description) {
            return this._description;
        }
        else {
            await this.parseMainPage();
        }
        return this._description;
    }
    /**
     * Gets the statistics of the anime.
     * @returns {Promise<AnimeStats>} The statistics of the anime.
     */
    async getStats() {
        if (this._stats) {
            return this._stats;
        }
        else {
            await this.parseMainPage();
        }
        return this._stats;
    }
    /**
     * Gets the details of the anime.
     * @returns {Promise<AnimeDetails>} The details of the anime.
     */
    async getDetails() {
        if (this._details) {
            return this._details;
        }
        else {
            await this.parseMainPage();
        }
        return this._details;
    }
    /**
     * Parses the episodes page of the anime to extract episodes details.
     */
    async parseEpisodesPage() {
        const HTML = await this._fetcher.fetchPage("episodes page" /* PageType.EPISODES */);
        const $ = cheerio.load(HTML);
        const RESULT = new Array();
        $("tr[data-episode-no]").each(async (_i, data) => {
            let title = $(data).find("td.ep-title").text();
            let emissionDate = $(data).find("td.ep-date").text();
            const LANGUAGES = new Array();
            $(data).find("span.flag-icon").each((_j, iconsdata) => {
                LANGUAGES.push($(iconsdata).attr("title"));
            });
            let playersURLstring = $(data).find("a.button.active.detail").attr("href");
            let playersURL = playersURLstring ? new URL("https://shinden.pl" + playersURLstring) : null;
            RESULT.push(new Episode(title, emissionDate, LANGUAGES, playersURL, this._fetcher));
        });
        this._episodes = RESULT.reverse();
    }
    /**
     * Gets the episodes of the anime.
     * @returns {Promise<Episode[]>} The episodes of the anime.
     */
    async getEpisodes() {
        if (this._episodes) {
            return this._episodes;
        }
        else {
            await this.parseEpisodesPage();
        }
        return this._episodes;
    }
    /**
     * Gets the login required status for the anime.
     * @returns {boolean} True if login is required, false otherwise.
     */
    get isLoginRequired() {
        return this._loginRequiredStatus;
    }
    /**
     * Gets the URL to the anime series.
     * @returns {URL} The URL to the anime series.
     */
    get urlToSeries() {
        return this._urlToSeries;
    }
    /**
    * Gets the URL to the anime episodes.
    * @returns {URL} The URL to the anime episodes.
    */
    get urlToEpisodes() {
        return this._urlToEpisodes;
    }
    /**
     * Creates an instance of Anime.
     * @param {string} urlToSeries - The URL to the anime series e.g. https://shinden.pl/series/12434-hunter-x-hunter-2011
     * @param {number} [maxRetries] - The maximum number of retries for fetching pages.
     */
    constructor(urlToSeries, maxRetries) {
        this._urlToSeries = new URL(urlToSeries);
        this._urlToEpisodes = new URL(this._urlToSeries + "/all-episodes");
        this.checkURL();
        this._fetcher = new Fetcher(this, maxRetries ? maxRetries : 5);
        this.checkAvailability();
    }
}
