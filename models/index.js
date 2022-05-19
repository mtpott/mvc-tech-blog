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

module.exports = { User, Post, Comment };