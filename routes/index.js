const router = require('express').Router();

// import api routes
const apiRoutes = require('./api');

router.use((req, res) => {
    res.status(404).send(`404! That page could not be found!`);
});

module.exports = router;