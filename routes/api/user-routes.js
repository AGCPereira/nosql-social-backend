const router = require('express').Router();


const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
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


module.exports = router;