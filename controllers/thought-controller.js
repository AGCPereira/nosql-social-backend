
        .catch(err => res.status(400).json(err));
    },

    // retrieve sorted list of thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // retrieve a thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found" });
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // update a thought 
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found" });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                return ({ message: "No thought found" });
            }
            return User.findOneAndUpdate(
                { _id: thoughtData.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "No user found for thought" });
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;