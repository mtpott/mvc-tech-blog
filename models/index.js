const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

//associations --> user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//post belongs to user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//comments --> user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//comments --> can belong to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//comments --> posts can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };