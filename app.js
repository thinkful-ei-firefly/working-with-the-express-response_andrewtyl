const express = require('express');
const app = express();
const morgan = require('morgan');
const playApps = require('./playstore')

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res
        .status(400)
        .send(`Please use /apps for all requests at this time.`);
});

app.listen(8080, () => {
    console.log("Express loaded on port 8080");
})

app.get('/apps', (req, res) => {
    let responseSent = false;
    let { sort, genres } = req.query;
    let returnApps = [];
    if (genres) {
        genres = genres.toLowerCase();
            for (let i = 0; i < playApps.length; i++) {
                let currentApp = playApps[i];
                let thisAppsGenre = currentApp.Genres.toLocaleLowerCase();
                if (thisAppsGenre.includes(genres)) {
                    returnApps.push(currentApp);
                }
            }
            console.log(returnApps);
            if (returnApps[0] == undefined) {
                responseSent = true;
                res
                    .status(400)
                    .send(`No results found. Please set 'genres' to 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card', or undefined.`);
            }
    }
    else {
        returnApps = playApps;
    }

    if (sort) {
        sort = sort.toLowerCase();
        if (sort == 'rating') {
            returnApps.sort((a, b) => (a.Rating > b.Rating) ? 1 : -1);
        }
        else if (sort == 'app') {
            returnApps.sort((a, b) => (a.App > b.App) ? 1 : -1)
        }
        else {
            responseSent = true;
            res
                .status(400)
                .send(`Please set 'sort' to undefined, 'rating', or 'app'.`)
        }
    }
    if (responseSent === false) {
        res
            .status(200)
            .send(returnApps);
    }
}
);