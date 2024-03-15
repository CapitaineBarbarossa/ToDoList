const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist_db'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});

app.use(express.json());

app.post('/todolist', (req, res) => {
});

app.put('/todolist/:id', (req, res) => {
});

app.delete('/todolist/:id', (req, res) => {
});

app.post('/todolist/:id/item', (req, res) => {
});

app.delete('/todolist/:id/item/:itemId', (req, res) => {
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
