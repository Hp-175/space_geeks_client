const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Comment=new Schema({
   
    username:{
        type:String,
        required:true
   },
   comment:{
       type:String
   }
},
{
   timestamps:true
});

const SpaceAchievementsSchema=new Schema({
    _Id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    Information:{
        type:String,
        required:true
    },
    credits:{
        type:String,
        default:''
    },
    comments:[Comment]
},
{
    timestamps:true
});
var SpaceAchievements=mongoose.model('SpaceAchievement',SpaceAchievementsSchema);
module.exports=SpaceAchievements;