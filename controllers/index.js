const router = require('express').Router();
const homepageRoutes = require('./homepage-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');

router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments