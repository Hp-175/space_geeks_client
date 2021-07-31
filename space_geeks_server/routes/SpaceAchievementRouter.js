const express=require('express');
const bodyParser=require('body-parser');
const SpaceAchievements = require('../models/SpaceAchievements');
const authenticate=require('../authenticate');
const fs=require('fs');

const SpaceAchievmentRouter=express.Router();

const cors=require('./cors');

SpaceAchievmentRouter.use(bodyParser.json());

SpaceAchievmentRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    SpaceAchievements.find(req.query)
    .then((Achievements)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Achievements);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    req.body.username=req.user.username;
    req.body._Id=req.user._id;
    SpaceAchievements.create(req.body)
    .then((Achivement)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Achivement);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /SpaceAchievements');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    SpaceAchievements.remove(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

SpaceAchievmentRouter.route('/:AchivementId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((Achievement)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Achievement);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('post operation not supported for /SpaceAchievements/'+req.params.AchivementId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((SpaceAchievementfound)=>{
        if(req.user._id!=SpaceAchievementfound._Id)
        {
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({'Error':'You are not allowed to change this post'});
        }
        else
        {
            SpaceAchievements.findByIdAndUpdate(req.params.AchivementId,{
                $set:req.body
            },{new:true})
            .then((Achievement)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(Achievement);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
    })
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((SpaceAchievementfound)=>{
        if(req.user._id!=SpaceAchievementfound._Id)
        {
            err=new Error('You are not allowed to delete this post');
            err.status=403;
            return next(err);
        }
        else
        {
            fs.unlinkSync('./public/images/'+SpaceAchievementfound.image);
            SpaceAchievements.findByIdAndRemove(req.params.AchivementId)
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
    })
    .catch((err)=>next(err));
});

SpaceAchievmentRouter.route('/:AchivementId/comments/:commentId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((Achievement)=>{
        var comment=Achievement.comments.find(({_id})=>req.params.commentId==_id);
        console.log(comment);
        if(comment==null||comment==undefined)
        {
            err=new Error('Comment not found');
            err.status=404;
            return next(err);
        }
        else
        {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(comment);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((Achievement)=>{
        req.body.username=req.user.username;
        Achievement.comments.push(req.body);
        Achievement.save()
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(Achievement);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /SpaceAchievements/:AchivementId/comments/:commentId');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    SpaceAchievements.findById(req.params.AchivementId)
    .then((SpaceAchievementfound)=>{
        var comment=SpaceAchievementfound.comments.find(({_id})=>req.params.commentId==_id);
        const ind=SpaceAchievementfound.comments.indexOf(comment);
        
            if(ind>-1&&comment.username===req.user.username)
            {
                SpaceAchievementfound.comments.splice(ind,1);
                SpaceAchievementfound.save()
                .then((resp)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            else
            {
                err=new Error('You are not allowed to delete this comment');
                err.status=403;
                return next(err);
            }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=SpaceAchievmentRouter;