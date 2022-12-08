const router = require('express').Router();

//import routes from api folder
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);




module.exports = router;