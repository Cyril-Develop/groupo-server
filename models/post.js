const dayjs = require('dayjs')

class Post  {
    constructor(post) {
        this.title = post.title;
        this.content = post.content;
        this.imagePost = post.imagePost;
        this.userId = post.userId;
        this.createdAt = dayjs(Date.now()).format();
    }
};

module.exports = Post;