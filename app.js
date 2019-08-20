const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`No entry given`);
});

app.listen(8080, () => {
    console.log("Express loaded on port 8080");
})