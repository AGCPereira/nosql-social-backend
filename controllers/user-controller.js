const { User, Thought } = require('../models');

const userController = {
    // api functions go here
    //
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // get users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
        })
        .populate({
            path: 'friends',
        })
        .select('-__v')
        .sort({_id: -1})
        .then(userData => res.json(userData))
        .catch(err => {
            res.status(400).json(err);
        });
    },

    // get data from a user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
        })
        .populate({
            path: 'friends',
        })
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found." });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found." });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found." });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
};


module.exports = userController;