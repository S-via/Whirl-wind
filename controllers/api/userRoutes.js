const router = require('express').Router();
const { User, Blog } = require('../../models');


// route to create a new user
router.post('/signup', async (req, res) => {
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
router.post('/', async (req, res) => {
    try {
        // match entered username to username in db
        const userData = await User.findOne({ 
            where: { 
                username: req.body.username
             },
             attributes: ['id', 'username', 'password'],
            });
        // if username does not exist, return error
        if (!userData) {
            res.status(400).json({ message: 'Invalid entry' });
            return;
        }
        // checkPassword function from User model
        const validatePass = await userData.checkPassword(req.body.password);
        // if password is incorrect, return error
        if (!validatePass) {
            res.status(400).json({ message: 'Incorrect, please try again (:' });
            return;
        }
        // if user credentials are correct, save their data in the session cookie
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, logged_in: true});
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