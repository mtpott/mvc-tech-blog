const Post = require('./Post');
const User = require('./User');

//associations --> user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//post belongs to user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };