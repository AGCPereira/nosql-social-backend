const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//api routes
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send(`404! Page could not be found`);
});

module.exports = router;