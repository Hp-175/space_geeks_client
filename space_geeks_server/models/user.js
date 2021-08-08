var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');

var User=new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    favoriteAchievements:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SpaceAchievement'
    }],
    favoriteFacts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Fact'
    }],
    favoriteTheories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FactinatingTheory'
    }],
    admin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});
User.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',User);
