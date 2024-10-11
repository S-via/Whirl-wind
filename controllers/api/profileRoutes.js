const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
// inside untils auth.js needs a path to activate this variable
const withAuth = require("../../utils/auth");

// redirect to homepage (login) if user is not logged in
router.get("/", withAuth, (req, res) => {
    res.render('profile');
});

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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(400).json({ message: "You must be logged in to log out" });
  }
});



module.exports = router;