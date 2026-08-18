const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();

dotenv.config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db = null;
let supabase = null;
let fallbackStoragePath = path.join(__dirname, 'messages.json');

if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('Supabase client initialized');
}

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

app.get('/contacts', (req, res) => {
  if (supabase) {
    return supabase
      .from('contacts')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Supabase fetch error:', error);
          return res.status(500).json({ error: 'Failed to fetch contacts from Supabase' });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.error('Supabase request failed:', err);
        return res.status(500).json({ error: 'Failed to fetch contacts from Supabase' });
      });
  }
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

  // Save the contact message to Supabase
  const messageEntry = {
    name,
    email,
    message,
  };

  if (supabase) {
    return supabase
      .from('contacts') 
      .insert([messageEntry])
      .then(({ error }) => {
        if (error) {
          console.error('Supabase insert error:', error);
          return res.status(500).json({ error: 'Failed to save contact to Supabase' });
        }

        return res.status(200).json({ message: 'Thank you for your message. I appreciate you reaching out, and I’ll get back to you as soon as possible.' });
      })
      .catch((err) => {
        console.error('Supabase request failed:', err);
        return res.status(500).json({ error: 'Failed to save contact to Supabase' });
      });
  }

  const loginEntry = {
    name,
    email,
    password,
  };

  if(supabase) {
    return supabase
      .from('login')
      .insert([loginEntry])
      .then(({ error }) => {
        if (error) {
          console.error('Supabase insert error:', error);
          return res.status(500).json({ error: 'Failed to login to Supabase' });
        }
        return res.status(200).json({ message: 'Login successful' });
      })
      .catch((err) => {
        console.error('Supabase request failed:', err);
        return res.status(500).json({ error: 'Failed to save login to Supabase' });
      });
  }

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

  
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
