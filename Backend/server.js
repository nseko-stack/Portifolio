const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const app = express();

dotenv.config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db = null;
let fallbackStoragePath = path.join(__dirname, 'messages.json');

if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME) {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    connectTimeout: 10000,
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.message);
      db = null;
      return;
    }
    console.log('Database connected');
  });

  db.on('error', (err) => {
    console.error('Database error:', err.message);
    db = null;
  });
}

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Potifolio backend is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', databaseConfigured: Boolean(db) });
});

app.get('/contact', (req, res) => {
  res.status(200).json({
    message: 'Use POST /contact to submit a message.',
    expectedBody: ['name', 'email', 'message']
  });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const messageEntry = {
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  if (db) {
    const query = 'INSERT INTO contacts (Name, Email, Message) VALUES (?, ?, ?)';

    return db.query(query, [name, email, message], (err) => {
      if (err) {
        console.error('Error inserting contact:', err);
        return res.status(500).json({ error: 'Failed to save contact' });
      }

      return res.status(200).json({ message: 'Contact saved successfully' });
    });
  }

  const existingMessages = fs.existsSync(fallbackStoragePath)
    ? JSON.parse(fs.readFileSync(fallbackStoragePath, 'utf8'))
    : [];

  existingMessages.push(messageEntry);
  fs.writeFileSync(fallbackStoragePath, JSON.stringify(existingMessages, null, 2));

  return res.status(200).json({
    message: 'Contact saved locally while no database is configured.'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
