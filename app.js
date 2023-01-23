// pegion chat app

const fs = require('fs');
const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const pug = require('pug');
const app = express();
const port = 80;

app.use('/static', express.static('static'));
app.use(urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'view'));

app.get('/', (req, res) => {
    res.status(200).render('login.pug');
});

app.post('/pegion', (req, res) => {
    const username = req.body.username;
    fs.writeFileSync("data.txt", username);
    res.status(200).render('index.pug');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


