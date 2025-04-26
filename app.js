const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Łączenie z bazą danych
const db = require('./db/connection');

// Serwowanie plików statycznych
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ustawienia widoków
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
const tenderRoutes = require('./routes/tenders');
app.use('/', tenderRoutes);

// Start serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
