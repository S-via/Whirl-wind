const router = require('express').Router();
const { Blog } = require('../../models');
// inside untils auth.js needs a path to activate this variable
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (re, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user.id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});