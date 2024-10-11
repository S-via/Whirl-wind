const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// render homepage
router.get('/', (req, res) => {
    res.render('homepage');
});


// if user is not logged in when they click "Home", render the login view (homepage)
router.get('/blogs', withAuth, (req, res) => {
    res.render('blogs');
})

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/blogs');
        return;
    }

    res.render('homepage');
})

router.get('/profile', withAuth, (req, res) => {
    res.render("profile");
})

// render signup view
router.get('/signup', (req, res) => {
    res.render('signup');
})


module.exports = router;

