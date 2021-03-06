const router = require('express').Router();

const userDb = require('../helpers/userDb');
const { allCapsPOST, allCapsPUT } = require('../custom_middleware/allCaps');

router.post('/', allCapsPOST, (req, res) => {
  if (req.body.name) {
    userDb
      .insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error:
            'There was an error while saving the user to the database. Try submitting a different name.'
        });
      });
  } else {
    res.status(400).json({
      error: 'Please provide a name for the user.'
    });
  }
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {
  userDb
    .remove(req.params.id)
    .then(numberOfUsers => {
      if (numberOfUsers === 1) {
        res
          .status(200)
          .json({ message: `Number of records deleted: ${numberOfUsers}` });
      } else {
        res
          .status(404)
          .json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

router.put('/', allCapsPUT, (req, res) => {
  if (!req.body.id || !req.body.changes) {
    res.status(400).json({
      error:
        'Please provide the ID of the user you intend to update as well as your intended changes.'
    });
  } else {
    userDb
      .update(req.body.id, req.body.changes)
      .then(user => {
        if (user) {
          res
            .status(200)
            .json({ message: 'You successfully updated the user.' });
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The user information could not be updated.' });
      });
  }
});

module.exports = router;
