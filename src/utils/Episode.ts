import { Player } from "./Player.js";
import { Fetcher } from "./fetching/Fetcher.js";
import { PageType } from "./fetching/PageType.js";
import * as cheerio from 'cheerio';
import { DataEpisode } from "./parsing/DataEpisode.js";


export class Episode {
    private _title: string;
    private _emissionDate: string;
    private _languages: Array<string>;
    private _fetcher: Fetcher;
    private _players: Player[] | undefined;

    private _playersURL: URL | null;

    /**
     * Creates an instance of Episode.
     * @param {string} title - The title of the episode.
     * @param {string} emissionDate - The emission date of the episode.
     * @param {string[]} languages - The languages available for the episode.
     * @param {URL | null} playersURL - The URL to the players page.
     * @param {Fetcher} fetcher - The fetcher instance used for retrieving page data.
     */
    constructor(title: string, emissionDate: string, languages: string[], playersURL: URL | null, fetcher: Fetcher) {
        this._title = title;
        this._emissionDate = emissionDate;
        this._languages = languages;
        this._playersURL = playersURL;
        this._fetcher = fetcher;
    }

    /**
     * Gets the title of the episode.
     * @returns {string} The title of the episode.
     */
    get title(): string {
        return this._title;
    }

    /**
     * Gets the emission date of the episode.
     * @returns {string} The emission date of the episode.
     */
    get emissionDate(): string {
        return this._emissionDate;
    }

    /**
     * Gets the languages available for the episode.
     * @returns {string[]} The languages available for the episode.
     */
    get languages(): string[] {
        return this._languages;
    }

    /**
     * Gets the URL to the players page.
     * @returns {URL | null} The URL to the players page.
     */
    get playersURL(): URL | null {
        return this._playersURL;
    }

    /**
     * Parses the players page to extract player information.
     */
    private async parsePlayersPage() {
        const HTML = await this._fetcher.fetchPage(PageType.PLAYERS, this);
        const $ = cheerio.load(HTML);

        const PLAYERS: Player[] = new Array<Player>();

        $("a[data-episode]").each((_i, data)=>{
            const DATA: DataEpisode = JSON.parse($(data).attr("data-episode")) as DataEpisode;
            PLAYERS.push(
                new Player(
                    DATA.online_id, DATA.player, DATA.username, 
                    DATA.user_id, DATA.lang_audio, DATA.lang_subs, 
                    DATA.max_res, DATA.subs_author, DATA.added, 
                    DATA.source, this._fetcher
                )
            );
        });

        this._players = PLAYERS;
    }

    /**
     * Returns the list of players for the episode.
     * @returns {Promise<Player[]>} A promise that resolves to an array of Player objects.
     */
    async getPlayers(): Promise<Player[]> {
        if(this._players) {
            return this._players;
        } else {
            await this.parsePlayersPage();
        }
        return this._players;
    }
}