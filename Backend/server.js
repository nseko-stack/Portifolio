const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

dotenv.config();
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

    const query = 'INSERT INTO contacts (Name, Email, Message) VALUES (?, ?, ?)';

    db.query(query, [ name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting contact:', err);
            res.status(500).json({ error: 'Failed to save contact' });
        } else {
            res.status(200).json({ message: 'Contact saved successfully' });
        }
    });
});

 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
