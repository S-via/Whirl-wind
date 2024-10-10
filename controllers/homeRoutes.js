const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');


// Get all blog and JOIN with user data
/* 
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'destination',
                'trip_rating',
                'budget',
                'lodging',
                'activities',
                'experience'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('home', { //changed from "homepage"
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one blog
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'destination',
                'trip_rating',
                'budget',
                'lodging',
                'activities',
                'experience'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found.' });
            return;
        }

        const blog = blogData.get({ plain: true });

        res.render('blog', { //create blog.handlebars
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
*/

// if user is not logged in when they click "Home", render the login view (homepage)
router.get('/', (req, res) => {
    if(req.session.logged_in) {
        res.redirect("/blogs");
    }
    
    res.render('homepage');
})


// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         // Find the logged in user based on the session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Blog }],
//         });

//         const user = userData.get({ plain: true });

//         res.render('profile', {
//             ...user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/profile', (req, res) => {
    // If the user is already logged in, redirect the request to blogs ('Home')
    if (req.session.logged_in) {
        res.redirect("/blogs");
        return;
    }
    //otherwise render homepage view (login)
    res.render('homepage');
})

// render signup view
router.get('/signup', (req, res) => {
    res.render('signup');
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

// render '/' homepage when logging out (add to blogRoutes)


module.exports = router;

