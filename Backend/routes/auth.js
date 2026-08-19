const express = require('express');

const router = express.Router();

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

      // Query the users table to find the user
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', name)
        .single();

      // Handle authentication errors
      if (error || !data) {
        console.error('User not found:', error?.message);
        return res.status(401).json({ error: 'Invalid username or password.' });
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

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', name)
        .single();

      if (error || !data) {
        console.error('User not found:', error?.message);
        return res.status(401).json({ error: 'Invalid username or password.' });
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