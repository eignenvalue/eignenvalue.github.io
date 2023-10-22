const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-rating', (req, res) => {
    const rating = req.body.rating;

    // Append the new rating to the CSV file
    fs.appendFile('ratings.csv', `${rating}\n`, (err) => {
        if (err) throw err;
    });

    res.redirect('/');
});

app.get('/get-ratings', (req, res) => {
    const ratings = [];
    fs.createReadStream('ratings.csv')
        .pipe(csv())
        .on('data', (data) => ratings.push(data.rating))
        .on('end', () => {
            // Return the last 5 ratings as JSON
            res.json(ratings.slice(-5));
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
