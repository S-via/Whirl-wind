const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
// inside untils auth.js needs a path to activate this variable
const withAuth = require("../../utils/auth");


// view user-specific posts
router.get('/', withAuth, async (req, res) => {
    try {
      // get username to display on blogs view (passed in res.render below)
      const user = await User.findByPk(req.session.user_id, {
        attributes: ["username"],
      });
      // use optional chaining to access username property
      const name = user?.username;

      const blogData = await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: User, attributes: ["username"] }],
      });

      // serialize data
      const blogposts = blogData.map((blogpost) =>
        blogpost.get({ plain: true })
      );

      res.render("profile", {
        blogposts,
        logged_in: true,
        name,
      });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})


router.post("/logout", withAuth, (req, res) => {
    req.session.destroy(() => {
      res.status(200).end();
  });
});


module.exports = router;