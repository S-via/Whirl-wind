const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
// inside untils auth.js needs a path to activate this variable
const withAuth = require("../../utils/auth");


// view user-specific posts
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {model: User, attributes: ['username']}
            ],
        });
        // serialize data 
        const blogPosts = blogData.map((blogpost) => blogpost.get({ plain: true}));
        res.render('profile', {
            blogPosts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post("/logout", withAuth, (req, res) => {
    req.session.destroy(() => {
      res.status(200).end();
  });
});


module.exports = router;