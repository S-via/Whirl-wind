
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// render homepage
router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/blogs');
        return;
    }

    res.render('homepage');
});


// if user is not logged in when they click "Home", render the login view (homepage)
router.get('/blogs', withAuth, async (req, res) => {
    const blogdata = await Blog.findAll()

    // serialize data and only get info we need
    const blogposts = blogdata.map(data => data.get({ plain: true }))

    //pass blogposts data
    res.render('blogs', {
        blogposts: blogposts
    });
})


router.get('/profile', withAuth, (req, res) => {
    res.render("profile");
})

// render signup view
router.get('/signup', (req, res) => {
    res.render('signup');
})


module.exports = router;


