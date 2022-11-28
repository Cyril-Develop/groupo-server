const dayjs = require('dayjs')

class Comment  {
    constructor(comment) {
        this.content = comment.content;
        this.userId = comment.userId;
        this.postId = comment.postId;
        this.createdAt = dayjs(Date.now()).format();
    }
};

module.exports = Comment;