const router = require('express').Router();
const { Blog } = require('../../models');
// inside untils auth.js needs a path to activate this variable
const withAuth = require('../../utils/auth');


// user can create new blog post only if logged in
router.post('/', withAuth, async (req, res) => {
    try {
        // create new post and associate with logged in user
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // respond with new blog post
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;