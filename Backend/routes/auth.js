const express = require('express');
const NodeCache = require('node-cache'); // 👈 Added node-cache import

const router = express.Router();

// Initialize a cache for user database records (expires in 10 minutes)
const userCache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

// Login route - receives supabase client from server
module.exports = (supabase) => {
  router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Validate request inputs
    if (!name || !password) {
      return res.status(400).json({ error: 'Username and Password are required' });
    }

    try {
      if (!supabase) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      let data = null;
      const cacheKey = `user_${name}`;

      // 1. Check if user database record is already in cache
      const cachedUser = userCache.get(cacheKey);

      if (cachedUser) {
        console.log(`User data for "${name}" served from auth cache`);
        data = cachedUser;
      } else {
        // 2. Cache miss: Query the users table to find the user
        const { data: dbData, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', name)
          .single();

        // Handle authentication errors
        if (error || !dbData) {
          console.error('User not found:', error?.message);
          return res.status(401).json({ error: 'Invalid username or password.' });
        }

        data = dbData;
        
        // 3. Save to cache for subsequent login requests
        userCache.set(cacheKey, data);
        console.log(`User data for "${name}" fetched from database and cached`);
      }

      // Check if password matches
      if (data.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Return success response with user info
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: data.id,
          username: data.username
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
  });

  router.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Username and Password are required' });
    }

    try {
      if (!supabase) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      let data = null;
      const cacheKey = `user_${name}`;

      // 1. Check if user database record is already in cache
      const cachedUser = userCache.get(cacheKey);

      if (cachedUser) {
        console.log(`User data for "${name}" served from auth cache (API route)`);
        data = cachedUser;
      } else {
        // 2. Cache miss: Query the users table to find the user
        const { data: dbData, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', name)
          .single();

        if (error || !dbData) {
          console.error('User not found:', error?.message);
          return res.status(401).json({ error: 'Invalid username or password.' });
        }

        data = dbData;
        
        // 3. Save to cache for subsequent login requests
        userCache.set(cacheKey, data);
        console.log(`User data for "${name}" fetched from database and cached (API route)`);
      }

      if (data.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: data.id,
          username: data.username
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
  });

  return router;
};
