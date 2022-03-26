const { Thought, User } = require('../models');

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      // .select('-__v')
      .sort({ _id: -1 })  // sort in DESC order
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: `No thought record found with id: ${params.id}` });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(response => {
      if (!response) {
        return res.status(404).json({ message: `Unable to create a Thought record` }
        );
      }
      else {
        console.log(response)
        User.findOneAndUpdate(
          { userId: User._id },
          { $push: { thoughts: response._id } },
          { new: true, runValidators: true }
        )
          .then(data => {
            if (!data) {
              res.status(404).json({ message: `No Thought record found with id: ${User.userId}` });
              return;
            }
            res.json({ message: `Thought record was successfully created` });
          })
      }})
      .catch(err => res.json(err));
  },



  // Create Reaction record and append to Thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: `Unable to add a Reaction.` });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },


  // update Thought record 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: `No Thought record found with id: ${params.id}` });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(400).json(err));
  },


  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(response => {
        if (!response) {
          return res.status(404).json({ message: `No Thought record found with id: ${params.id}` }
          );
        }
        else User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true, runValidators: true }
        )
          .then(data => {
            if (!data) {
              // res.status(404).json({ message: `No Thought record found with id: ${params.id}` });
              res.json({ message: `Thought record id: ${params.id} was successfully deleted` });
              return;
            } else {
              res.status(404).json({ message: `No Thought record found with id: ${params.id}` });
          }})
          .catch(err => res.json(err));
      })
  },


  // remove reaction
  removeReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: body } },
      { new: true, runValidators: true }
      )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: `No Thought record found with id: ${params.id}` });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(400).json(err));
    } 
    
    };
    

module.exports = thoughtController;