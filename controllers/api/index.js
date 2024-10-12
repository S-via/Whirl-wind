
// require path for router and export blog and user routes
const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);
router.use('/profile', profileRoutes);

module.exports = router;

