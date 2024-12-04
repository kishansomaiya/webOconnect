const db = require('../config/db');

exports.createPost = (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', 
    [userId, content], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Post created successfully' });
    }
  );
};

exports.getPosts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  // Modify the query to count likes for each post
  db.query(`
    SELECT 
      posts.*, 
      users.username, 
      COUNT(likes.id) AS likes 
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id, users.username
    ORDER BY posts.created_at DESC 
    LIMIT ? OFFSET ?
  `, 
  [parseInt(limit), parseInt(offset)],
  (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.likePost = (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  // First, check if the user has already liked the post
  db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', 
    [userId, postId], 
    (checkErr, existingLikes) => {
      if (checkErr) {
        return res.status(500).json({ error: checkErr.message });
      }

      // If user has already liked the post, remove the like (toggle)
      if (existingLikes.length > 0) {
        db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', 
          [userId, postId], 
          (deleteErr, deleteResult) => {
            if (deleteErr) {
              return res.status(500).json({ error: deleteErr.message });
            }
            res.status(200).json({ message: 'Post unliked successfully', liked: false });
          }
        );
      } else {
        // If user hasn't liked the post, add the like
        db.query('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', 
          [userId, postId], 
          (insertErr, insertResult) => {
            if (insertErr) {
              return res.status(500).json({ error: insertErr.message });
            }
            res.status(200).json({ message: 'Post liked successfully', liked: true });
          }
        );
      }
    }
  );
};
