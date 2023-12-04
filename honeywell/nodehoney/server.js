const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.post('/calculateShortestPath', (req, res) => {
    const selectedCities = req.body.selectedCities;

    const shortestPath = selectedCities.reverse();
    
    res.json(shortestPath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
