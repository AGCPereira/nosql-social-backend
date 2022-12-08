const router = require('express').Router();

//import controller 
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// GET and POST
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET, PUT, DELETE set up
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//GET by username
router
    .route('/name/:username')
    .get(getUserByName);

//PUT for add and remove friend
router
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend);

module.exports = router;