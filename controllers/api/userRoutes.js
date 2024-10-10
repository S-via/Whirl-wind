const router = require('express').Router();
const { User,Blog } = require('../../models');





// route to create a new user
router.post('/', async (req, res) => {
    try {
        // request body had username, email, password
        const userData = await User.create(req.body);
        // save the new user id in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            // send json response with new user data
            res.status(200).json(userData);
        });
    } catch (err) {
        // send error if new user couldn't be created
        res.status(400).json(err);
    }
});
// route for existing users to login
router.post('/login', async (req, res) => {
    try {
        // match entered email to user email in db
        const userData = await User.findOne({ where: { email: req.body.email } });
        // if email does not exist, return error
        if (!userData) {
            res.status(400).json({ message: 'Incorrect, please try again (:' })
            return;
        }
        // checkPassword function from User model
        const validatePass = await userData.checkPassword(req.body.password);
        // if password is incorrect, return error
        if (!validatePass) {
            res.status(400).json({ message: 'Incorrect, please try again (:' });
            return;
        }
        // If login is succesfull fetch users blogs
        const userBlogs = await Blog.findAll({
            where:{user_id:userData.id}
        })
        // if user credentials are correct, save their data in the session cookie
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, blogs: userBlogs, message: 'Logged in (:' });

        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;