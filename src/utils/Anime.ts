import { AnimeType } from "./AnimeType.js";
import * as cheerio from 'cheerio';
import { PageType } from "./fetching/PageType.js";
import { Fetcher } from "./fetching/Fetcher.js";
import { AnimeStats } from "./AnimeStats.js";
import { AnimeDetails } from "./AnimeDetails.js";
import { AnimeDetailsType } from "./parsing/AnimeDetailsType.js";
import { AnimeStatus } from "./AnimeStatus.js";

/**
 * Class representing an anime, including its details and statistics.
 */
export class Anime {
    // Utils
    private _urlToSeries: URL;
    private _urlToEpisodes: URL;
    private _available: boolean = false;
    private _loginRequiredStatus: boolean | undefined = undefined;
    private _fetcher: Fetcher;
    
    // Data
    private _rating: number | undefined = undefined;
    private _imageURL: URL | undefined = undefined;
    private _animeType: AnimeType | undefined = undefined;
    private _description: string | undefined = undefined;
    private _title: string | undefined = undefined;
    private _stats: AnimeStats | undefined = undefined;
    private _details: AnimeDetails | undefined = undefined;

    /**
     * Checks if the anime is available.
     * @throws Will throw an error if the anime is not available.
     */
    private async checkAvailability() {
        try {
            await this._fetcher.fetchPage(PageType.ANIME_MAIN);
        } catch(e) {
            throw new Error(`${this._urlToSeries} is not available on shinden.pl! Fetcher error: ${e}`);
        }
    }

    /**
     * Parses the main page of the anime to extract details.
     * @throws Will throw an error if required data is missing.
     */
    private async parseMainPage() {
        const HTML = await this._fetcher.fetchPage(PageType.ANIME_MAIN);
        
        const $ = cheerio.load(HTML);

        this._description = $("#description").find("p").text();
        if(this._description == undefined) throw new Error("Error parsing main page: description is undefined!");

        if(this.isLoginRequired) {
            this._imageURL = new URL("https://shinden.pl/res/other/placeholders/title/100x100.jpg");
        } else {
            const IMG_PATH = $("section.title-cover").find("img.info-aside-img").attr("src");
            if(IMG_PATH == undefined) throw new Error("Error parsing main page: imageURL is undefined!");
            this._imageURL = new URL("https://shinden.pl" + IMG_PATH);
            
        }

        this._rating = Number($("span.info-aside-rating-user").text().replace(",", "."));
        
        this._title = $("span.title").text();
        if(this._title == undefined) throw new Error("Error parsing main page: title is undefined!");


        const STATS = new Array<number>();
        const DETAILS_TEXT = new Array<string>();
        const DETAILS_VALUE = new Array<string>();

        $("section.title-small-info").find("dt").each(async(_i, data)=>{
            DETAILS_TEXT.push($(data).text().replace(":", ""));
        });

        $("section.title-small-info").find("dd").each(async(_i, data)=>{
            DETAILS_VALUE.push($(data).text());
        });
        
        $("section.title-stats").find("dd").each(async (_i, data)=>{
            STATS.push(Number($(data).text()));
        });

        if(STATS.length < 7) throw new Error("Error parsing main page: stats array length < 7");
        this._stats = new AnimeStats(STATS[0], STATS[1], STATS[2], STATS[3], STATS[4], STATS[5], STATS[6]);


        
        let _type: AnimeType;
        let _status: AnimeStatus;
        let _aired: string | null = null;
        let _ended: string | null = null;
        let _episodes: number | null = null;
        let _producers: Array<string> = new Array();
        let _durationPerEpisodeInMinutes: number | null = null;
        let _MPAA: string | null = null;

        for(let i=0; i<DETAILS_TEXT.length; i++) {
            switch(DETAILS_TEXT[i]) {
                case AnimeDetailsType.TYPE:
                    _type = DETAILS_VALUE[i] as AnimeType;
                    break;
                case AnimeDetailsType.STATUS:
                    _status = DETAILS_VALUE[i] as AnimeStatus;
                    break;
                case AnimeDetailsType.AIRED:
                    _aired = DETAILS_VALUE[i];
                    break;
                case AnimeDetailsType.ENDED:
                    _ended = DETAILS_VALUE[i];
                    break;
                case AnimeDetailsType.EPISODES:
                    _episodes = Number(DETAILS_VALUE[i]);
                    break;
                case AnimeDetailsType.PRODUCERS:
                    DETAILS_VALUE[i].split(",").forEach(e=>{
                        const PRODUCER = e.replace("\n", "");
                        if(PRODUCER.length > 0) _producers.push(PRODUCER);
                    });
                    break;
                case AnimeDetailsType.DURATION_PER_EPISODE_IN_MINUTES:
                    _durationPerEpisodeInMinutes = Number(DETAILS_VALUE[i].replace("min", ""));
                    break;
                case AnimeDetailsType.MPAA:
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
    async checkURL(url?: URL) {
        let checkURL: URL;
        
        if(url) {
            checkURL = url;
        } else {
            checkURL = this._urlToSeries;
        }

        if(checkURL.origin != "https://shinden.pl") {
            throw new Error("Invalid origin. URL must be from 'https://shinden.pl'");
        } else if(!(checkURL.pathname.startsWith('/series/') || checkURL.pathname.startsWith('/titles/'))) {
            throw new Error("Invalid pathname. URL must start with '/series/' or '/titles/'");
        } else if(checkURL.pathname.startsWith('/titles/')) {
            this._loginRequiredStatus = true;
        } else {
            this._loginRequiredStatus = false;
        }
    }
    
    /**
     * Gets the rating of the anime.
     * @returns {Promise<number>} The rating of the anime.
     */
    async getRating(): Promise<number> {
        if(this._rating) {
            return this._rating;
        } else {
            await this.parseMainPage();
        }

        return this._rating;
    }

    /**
     * Gets the image URL of the anime.
     * @returns {Promise<URL>} The image URL of the anime.
     */
    async getImageURL(): Promise<URL> {
        if(this._imageURL) {
            return this._imageURL;
        } else {
            await this.parseMainPage();
        }
        return this._imageURL;
    }

    /**
     * Gets the title of the anime.
     * @returns {Promise<string>} The title of the anime.
     */
    async getTitle(): Promise<string> {
        if(this._title) {
            return this._title;
        } else {
            await this.parseMainPage();
        }
        return this._title;
    }

    /**
     * Gets the description of the anime.
     * @returns {Promise<string>} The description of the anime.
     */
    async getDescription(): Promise<string> {
        if(this._description) {
            return this._description;
        } else {
            await this.parseMainPage();
        }
        return this._description;
    }

    /**
     * Gets the statistics of the anime.
     * @returns {Promise<AnimeStats>} The statistics of the anime.
     */
    async getStats(): Promise<AnimeStats> {
        if(this._stats) {
            return this._stats;
        } else {
            await this.parseMainPage();
        }
        return this._stats;
    }

    /**
     * Gets the details of the anime.
     * @returns {Promise<AnimeDetails>} The details of the anime.
     */
    async getDetails(): Promise<AnimeDetails> {
        if(this._details) {
            return this._details;
        } else {
            await this.parseMainPage();
        }
        return this._details;
    }

    /**
     * Gets the login required status for the anime.
     * @returns {boolean} True if login is required, false otherwise.
     */
    get isLoginRequired(): boolean {
        return this._loginRequiredStatus;
    }
    
    /**
     * Gets the URL to the anime series.
     * @returns {URL} The URL to the anime series.
     */
    get urlToSeries(): URL {
        return this._urlToSeries;
    }

     /**
     * Gets the URL to the anime episodes.
     * @returns {URL} The URL to the anime episodes.
     */
    get urlToEpisodes(): URL {
        return this._urlToEpisodes;
    }

    /**
     * Creates an instance of Anime.
     * @param {string} urlToSeries - The URL to the anime series.
     * @param {number} [maxRetries] - The maximum number of retries for fetching pages.
     */
    constructor(urlToSeries: string, maxRerties?: number) {
        this._urlToSeries = new URL(urlToSeries);
        this._urlToEpisodes = new URL(this._urlToSeries + "/episodes");

        this.checkURL();

        this._fetcher = new Fetcher(this, maxRerties ? maxRerties : 5);
        
        this.checkAvailability();
    }
}