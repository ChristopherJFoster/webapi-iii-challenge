const router = require('express').Router();

const postDb = require('../helpers/postDb');

router.post('/', (req, res) => {
  const newPost = req.body;
  if (newPost.id && newPost.text && newPost.user_id) {
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
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
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
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// router.delete('/:id', (req, res) => {
//   postDb
//     .finpostDbyId(req.params.id)
//     .then(post => {
//       if (post[0]) {
//         postDb.remove(req.params.id).then(res.status(200).json(post[0]));
//       } else {
//         res
//           .status(404)
//           .json({ message: 'The post with the specified ID does not exist.' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'The post could not be removed' });
//     });
// });

// router.put('/:id', (req, res) => {
//   const { title, contents } = req.body;
//   if (!title || !contents) {
//     res.status(400).json({
//       errorMessage: 'Please provide title and contents for the post.'
//     });
//   } else {
//     postDb
//       .update(req.params.id, req.body)
//       .then(post => {
//         if (post) {
//           res.status(200).json(req.body);
//         } else {
//           res.status(404).json({
//             message: 'The post with the specified ID does not exist.'
//           });
//         }
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: 'The post information could not be modified.' });
//       });
//   }
// });

module.exports = router;
