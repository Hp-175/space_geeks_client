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

const FacinatingTheorySchema=new Schema({
    _Id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    Information:{
        type:String,
        required:true
    },
    By:{
        type:String,
        required:true,
        default:''
    },
    Comments:[Comment]
},
{
    timestamps:true
});
var FactinatingTheorys=mongoose.model('FactinatingTheory',FacinatingTheorySchema);
module.exports=FactinatingTheorys;