const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const auth = require('../../helpers/auth');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//get a single post
router.get('/:id', auth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'post not found.' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//add a new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update an existing post
router.put('/:id', auth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'post not found.' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a post
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'post not found.' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;