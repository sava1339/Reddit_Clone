const Router = require('express');
const router = new Router();
const UserRouter = require('./UserRouter');
const CommentRouter = require('./CommentRouter');
const FollowerRouter = require('./FollowerRouter');
const PostRouter = require('./PostRouter');
const PostSavedRouter = require('./PostSavedRouter');
const SavedRouter = require('./SavedRouter');
const ChatGroupRouter = require('./ChatGroupRouter');
const ChatFollowerRouter = require('./ChatFollowerRouter');
const ChatMessageRouter = require('./ChatMessageRouter');
const CommunityRouter = require('./CommunityRouter');

router.use('/user',UserRouter);
router.use('/comment',CommentRouter);
router.use('/follower',FollowerRouter);
router.use('/post-saved',PostSavedRouter);
router.use('/saved',SavedRouter);
router.use('/chat-group',ChatGroupRouter);
router.use('/chat-follower',ChatFollowerRouter);
router.use('/chat-message',ChatMessageRouter);
router.use('/post',PostRouter);
router.use('/community',CommunityRouter);

module.exports = router;
export{}