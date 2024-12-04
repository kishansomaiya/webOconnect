const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
    [username, email, hashedPassword], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.followUser = (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  db.query('INSERT INTO follows (follower_id, following_id) VALUES (?, ?)', 
    [followerId, followingId], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'User followed successfully' });
    }
  );
};
