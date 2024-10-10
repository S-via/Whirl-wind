const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// inside untils auth.js needs a path to activate this variable
const withAuth = require('../../utils/auth');


////////////////////////////////////////

// GET api/blogs with logged in users to view ALL blog post 
router.get('/', withAuth, async (req, res) => {
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
                {
                    model: Comment,
                    attributes: ['comments', 'blog_id', 'user_id'],

                }
            ]
        });
        res.status(200).json(blogData)

    } catch (err) {
        res.status(500).json(err);
    }

});
// GET /api/blogs/:id and allow user to create new post 
router.get('/:id', withAuth, async (req, res) => {
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
                {
                    model: Comment,
                    attributes: ['comments', 'blog_id', 'user_id'],
                    
                },
            ]
        })
        if (!blogData) {
            res.status(404).json({ message: 'no blog found' })
            return;
        }
        // renders specific post to the blogs page 
        const blog = blogData.get({plain:true}); 
        res.render('blogs',{blog,loggedIn:true})
        
    } catch (err) {
        res.status(500).json(err)
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
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
 });
 




module.exports = router;