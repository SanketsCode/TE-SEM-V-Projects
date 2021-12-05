const express = require('express');
const { requireSignin } = require('../controllers/auth.controller');
const { CreatePost, GetPosts,read,update,remove } = require('../controllers/post.controller');
const router = express.Router();


router.get('/',GetPosts);
router.post('/',requireSignin,CreatePost);
router.get('/:slug',read);
router.put('/:slug',requireSignin,update);
router.delete('/:slug',requireSignin,remove);



module.exports = router;