const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// inside untils auth.js needs a path to activate this variable
const withAuth = require('../../utils/auth');

// GET api/blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'destination',
                'trip_rating',
                'budget',
                'lodgin',
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
// GET /api/blogs/:id
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
        res.json(blogData);
        
        
    } catch (err) {
        res.status(500).json(err)
    }
});
// allows to edit post 
router.get('edit/:id',withAuth,async (req,res)=>{
    try{
        const blogData = await Blog.findOne({
            ...req.body,
            user_id:req.session.user_id,
            
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
        res.json(blogData);
    } catch (err){
        res.status(500).json(err)
    }
});

// user can create new blog post only if logged in
router.post('/', withAuth, async (req, res) => {
    try {
        // create new post and associate with logged in user
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // respond with new blog post
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT api/blogs/:id

router.put('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(
            {
                ...req.body,
                user_id: req.session.user_id,
            },
            // targets blog post by id 
            {
                where: {
                    id: req.params.id,
                },
            })
        if (!blogData) {
            res.status(404).json({ message: 'no blog found' });
            return;
        }
        res.json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE api/blogs/:id
router.delete('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy(
            {
                ...req.body,
                user_id: req.session.user_id,
            },
            // targets blog post by id 
            {
                where: {
                    id: req.params.id,
                },
            })
        if (!blogData) {
            res.status(404).json({ message: 'no blog found' });
            return;
        }
        res.json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;