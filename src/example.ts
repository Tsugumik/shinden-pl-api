import { Anime } from "./utils/Anime.js";

const hunter_x_hunter = new Anime("https://shinden.pl/series/116-hunter-x-hunter");
const SNK = new Anime("https://shinden.pl/titles/34848-shingeki-no-kyojin-season-2");

hunter_x_hunter.isLoginRequired().then(result=>{
    console.log(result);
});

SNK.isLoginRequired().then(result=>{
   console.log(result);
});
