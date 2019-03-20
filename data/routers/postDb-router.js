const router = require('express').Router();

const postDb = require('../helpers/postDb');
const userDb = require('../helpers/userDb');

router.post('/', (req, res) => {
  const newPost = req.body;
  if (newPost.text && newPost.user_id) {
    userDb.getById(newPost.user_id).then(user => {
      if (user) {
        postDb
          .insert(newPost)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(err => {
            res.status(500).json({
              error: 'There was an error while saving the post to the database'
            });
          });
      } else {
        res
          .status(404)
          .json({ error: 'The user with the specified ID does not exist.' });
      }
    });
  } else {
    res.status(400).json({
      error: 'Please provide a valid user_id and text for the post.'
    });
  }
});

router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  postDb
    .getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {
  postDb
    .remove(req.params.id)
    .then(numberOfPosts => {
      if (numberOfPosts === 1) {
        res
          .status(200)
          .json({ message: `Number of records deleted: ${numberOfPosts}` });
      } else {
        res
          .status(404)
          .json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

router.put('/', (req, res) => {
  console.log(req.body.id);
  console.log(req.body.changes);
  if (!req.body.id || !req.body.changes) {
    res.status(400).json({
      error:
        'Please provide the ID of the post you intend to update as well as your intended changes.'
    });
  } else {
    postDb
      .update(req.body.id, req.body.changes)
      .then(post => {
        if (post) {
          res
            .status(200)
            .json({ message: 'You successfully updated the post.' });
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The post information could not be updated.' });
      });
  }
});

module.exports = router;
