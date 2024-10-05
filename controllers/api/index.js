// require path for router and export blog and user routes
const router = require('express').Router();
const blogRouter= require('./blogRoutes');
const userRoutes = require('./userRoutes');

router.use('/blogs',blogRouter);
router.use('/users',userRoutes);

module.exports = router;