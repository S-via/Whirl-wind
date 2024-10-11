const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// inside untils auth.js needs a path to activate this variable
const withAuth = require('../../utils/auth');

// GET api/blogs with logged in users to view ALL blog post 
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });
        // serialize data
        const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('blogs', {
            blogposts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err);
    }

});


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
 
// POST - '/logout' route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).json({ message: 'error logging out'});
    }
});



module.exports = router;