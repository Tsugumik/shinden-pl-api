import { stat } from "fs";
import { AnimeType } from "./AnimeType.js";
import ShindenHeaders from "./ShindenHeaders.js";
import * as cheerio from 'cheerio';

export class Anime {
    name: string;
    private _urlToSeries: URL;
    private _urlToEpisodes: URL;
    
    private _rating: number | undefined = undefined;
    private _imageURL: URL | undefined = undefined;
    private _animeType: AnimeType | undefined = undefined;
    private _loginRequiredStatus: boolean | undefined = undefined;
    private _available: boolean = false;

    private _cachedMainHtml: string | undefined = undefined;
    private _cachedEpisodesHtml: string | undefined = undefined; 

    private async checkAvailability() {
        const STATUS: number = await this.fetchAndCacheMainPage();

        if(STATUS != 200) {
            throw new Error(`${this._urlToSeries} is not available on shinden.pl! Server response: ${STATUS}`);
        }
    }

    private async fetchAndCacheMainPage(): Promise<number> {
        const REQ = await fetch(this._urlToSeries, {
            headers: new Headers(ShindenHeaders.FRONTEND),
            method: "GET"
        });

        this._cachedMainHtml = await REQ.text();

        return REQ.status;
    }

    private async fetchAndCacheEpisodesPage(): Promise<number> {
        const REQ = await fetch(this._urlToEpisodes, {
            headers: new Headers(ShindenHeaders.FRONTEND),
            method: "GET"
        });

        this._cachedEpisodesHtml = await REQ.text();

        return REQ.status;
    }

    private async parseMainPage() {
        if(!this._cachedMainHtml) await this.fetchAndCacheMainPage();
        if(this._loginRequiredStatus) this._imageURL = new URL("https://shinden.pl/res/other/placeholders/title/100x100.jpg");
        const $ = cheerio.load(this._cachedMainHtml);
    }

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

    

    async getRating(): Promise<number> {
        if(this._rating) {
            return this._rating;
        } else {
            await this.parseMainPage();
        }

        return this._rating;
    }

    async getImageURL(): Promise<URL> {
        if(this._imageURL) {
            return this._imageURL;
        } else {
            await this.parseMainPage();
        }
        return this._imageURL;
    }

    async isLoginRequired(): Promise<boolean> {
        return this._loginRequiredStatus;
    }
    

    constructor(urlToSeries: string) {
        this._urlToSeries = new URL(urlToSeries);
        this.checkURL();
        this.checkAvailability();

        this._urlToEpisodes = new URL(this._urlToSeries + "/episodes");
    }
}