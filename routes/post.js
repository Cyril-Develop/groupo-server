const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multerPost = require('../middleware/multer-post');
const permissionPost = require('../middleware/permission-post');
const permissionComment = require('../middleware/permission-comment');

router.post('/', auth, multerPost, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getPost);
router.delete('/:id', auth, permissionPost, postCtrl.deletePost);
router.put('/:id', auth, permissionPost, multerPost, postCtrl.editPost);
router.get('/:id/like', auth, postCtrl.getLikes);
router.post('/:id/like', auth, postCtrl.likePost);
router.post('/:id/comment', auth, postCtrl.addComment);
router.get('/:id/comment', auth, postCtrl.getComments);
router.delete('/:id/comment', auth, permissionComment, postCtrl.deleteComment);

module.exports = router;