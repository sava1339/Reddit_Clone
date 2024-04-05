import {DataTypes} from 'sequelize';
const sequelize = require('../db');

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    karma:{type:DataTypes.INTEGER,allowNull:false},
    avatarLink:{type:DataTypes.STRING,unique:true,allowNull:true},
    password:{type:DataTypes.STRING,unique:true,allowNull:false},
    login:{type:DataTypes.STRING,unique:true,allowNull:false},
    username:{type:DataTypes.STRING,allowNull:false}
});

const Community = sequelize.define('community',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    dataLink:{type:DataTypes.STRING,unique:true,allowNull:false},
    userCommunity:{type:DataTypes.BOOLEAN,allowNull:false}
});

const Follower = sequelize.define('follower',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
});
const Comment = sequelize.define('comment',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    dataLink:{type:DataTypes.STRING,unique:true,allowNull:false},
});
const Saved = sequelize.define('saved',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
});
const PostSaved = sequelize.define('post_saved',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
});
const Post = sequelize.define('post',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    karma:{type:DataTypes.INTEGER,allowNull:false},
    dataLink:{type:DataTypes.STRING,unique:true,allowNull:false},
});
const ChatGroup = sequelize.define('chat_group',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    dataLink:{type:DataTypes.STRING,unique:true,allowNull:false},
    chatGroupUser:{type:DataTypes.BOOLEAN,allowNull:false},
});
const ChatFollower = sequelize.define('chat_follower',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
});
const ChatMessage = sequelize.define('chat_message',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    dataLink:{type:DataTypes.STRING,unique:true,allowNull:false},
});

const CommunityTypes = sequelize.define('community_types',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true}
})
const Type = sequelize.define('type',{
    id:{type:DataTypes.INTEGER,unique:true,autoIncrement:true,allowNull:false,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false}
})

Community.hasOne(CommunityTypes);
CommunityTypes.belongsTo(Community);

CommunityTypes.hasMany(Type);
Type.belongsTo(CommunityTypes);

ChatGroup.hasMany(ChatFollower);
ChatFollower.belongsTo(ChatGroup);

ChatGroup.hasMany(ChatMessage);
ChatMessage.belongsTo(ChatGroup);

User.hasMany(Community);
Community.belongsTo(User);

User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);

User.hasMany(Saved);
Saved.belongsTo(User);

User.hasMany(Follower);
Follower.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(ChatGroup);
ChatGroup.belongsTo(User);

Community.hasMany(Follower);
Follower.belongsTo(Community);

Community.hasMany(Post);
Post.belongsTo(Community);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(PostSaved);
PostSaved.belongsTo(Post);

Saved.hasMany(PostSaved);
PostSaved.belongsTo(Saved);

module.exports = {
    User,
    Community,
    Follower,
    Comment,
    Saved,
    PostSaved,
    Post,
    ChatGroup,
    ChatFollower,
    ChatMessage,
    CommunityTypes,
    Type
}