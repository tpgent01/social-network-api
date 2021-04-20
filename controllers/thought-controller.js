const { User, Thought } = require('../models');

const thoughtController = {
    
    // Get All Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Get Single Thought By ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    // Create Thought
    createThought({ body }, res) {
        Thought.create( body )
        .then(({ _id, _doc }) => {
            return User.findOneAndUpdate(
            { username: body.username },
            { $push: { thoughts: _id } }
            ).then(res.json(_doc))
        })
        .catch(err => res.status(400).json(err));
    },

    // Update Thought By ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true  })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.id },
          { $push: {reactions: body } },
          { new: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull:  {reactions: params.reactionId } },
            { new: true }
            )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;