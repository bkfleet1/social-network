const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })  // sort in DESC order
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
getUserById({ params }, res) {
  User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

// update user by id
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
},

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;
