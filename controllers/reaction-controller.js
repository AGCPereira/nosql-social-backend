const { User, Thought } = require('../models');

const reactionController = {
    // create a reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found." });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId } } },
            { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                return ({ message: "No thought found." });
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};


module.exports = reactionController;