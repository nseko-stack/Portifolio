const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs'); 
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const NodeCache = require('node-cache'); // 👈 Import node-cache
const authRouter = require('./routes/auth');

const app = express();

dotenv.config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Cache: Items expire automatically after 5 minutes (300 seconds)
const contactsCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

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

// GET /contacts: Now utilizes the memory cache layer
app.get('/contacts', (req, res) => {
  // 1. Try to fetch data from the memory cache first
  const cachedData = contactsCache.get('all_contacts');
  if (cachedData) {
    console.log('Serving contacts from memory cache');
    return res.status(200).json(cachedData);
  }

  // 2. Cache miss: Fetch from Supabase database
  if (supabase) {
    return supabase
      .from('contacts')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Supabase fetch error:', error);
          return res.status(500).json({ error: 'Failed to fetch contacts from Supabase' });
        }
        
        // 3. Save database response to memory cache before responding
        contactsCache.set('all_contacts', data);
        console.log('Contacts fetched from Supabase and saved to cache');
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.error('Supabase request failed:', err);
        return res.status(500).json({ error: 'Failed to fetch contacts from Supabase' });
      });
  } else {
    return res.status(503).json({ error: 'Supabase client is not initialized' });
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

        // ⚡ Cache Invalidation: Clear cache so the next GET request pulls the new message
        contactsCache.del('all_contacts');
        console.log('Cache cleared due to new contact entry registration');

        return res.status(200).json({ message: 'Thank you for your message. I appreciate you reaching out, and I’ll get back to you as soon as possible.' });
      })
      .catch((err) => {
        console.error('Supabase request failed:', err);
        return res.status(500).json({ error: 'Failed to save contact to Supabase' });
      });
  }

  if (db) {
    const query = 'INSERT INTO contacts (Name, Email, Message) VALUES (?, ?, ?)';

    return db.query(query, [name, email, message], (err) => {
      if (err) {
        console.error('Error inserting contact:', err);
        return res.status(500).json({ error: 'Failed to save contact' });
      }

      // ⚡ Cache Invalidation for MySQL fallback path
      contactsCache.del('all_contacts');
      console.log('Cache cleared due to new MySQL contact entry registration');

      return res.status(200).json({ message: 'Contact saved successfully' });
    });
  }
});

// Use auth router
if (supabase) {
  app.use(authRouter(supabase));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
