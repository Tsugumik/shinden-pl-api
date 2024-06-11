# shinden-pl-api
Unofficial TypeScript API for shinden.pl

## Features
- Fetch anime details by series URL
    - type
    - status
    - air date
    - end date
    - episodes count
    - producers
    - duration per episodes in minutes
    - MPAA rating
- Fetch anime episodes and online players URLs.

And many more.

Docs available [here](https://tsugumik.github.io/shinden-pl-api).

## Installation
```bash
npm i shinden-pl-api
```
```ts
import { Anime, searchAnime } from "shinden-pl-api";
```

## Example use

### Search for an anime and get its description
```ts
import { Anime, searchAnime } from "shinden-pl-api";

searchAnime("Hunter x Hunter (2011)").then(result=>{
    result.getSearchResults().then(async sr=>{
        const ANIME = new Anime(sr[0].seriesURL.href);
        const ANIME_DESCRIPTION = await ANIME.getDescription();
        console.log(ANIME_DESCRIPTION);
    });
});
```

### Fetch anime details
```ts
import { Anime } from "shinden-pl-api";

const HXH = new Anime("https://shinden.pl/series/116-hunter-x-hunter");

const HXH_details = await HXH.getDetails();

console.log(HXH_details.MPAA);
```

### Fetch episodes and player URLs
```ts
import { Anime } from "shinden-pl-api";

const HXH = new Anime("https://shinden.pl/series/116-hunter-x-hunter");
const HXH_ep = await HXH.getEpisodes();
const HXH_ep0p = await HXH_ep[0].getPlayers();
const PLAYER_URL = await HXH_ep0p[0].getExternalPlayerURL();

console.log(PLAYER_URL); 
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the existing code style and include tests for your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
This API is unofficial and not affiliated with shinden.pl. All data and trademarks are the property of their respective owners.