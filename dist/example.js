import { searchAnime } from "./searchAnime.js";
import { Anime } from "./utils/Anime.js";
searchAnime("Hunter x Hunter (2011)").then(async (result) => {
    result.getSearchResults().then(async (sresults) => {
        sresults.forEach(async (sr) => {
            const ANIME = new Anime(sr.seriesURL.href);
            const DESCRIPTION = await ANIME.getDescription();
            console.log(DESCRIPTION);
        });
    });
});
