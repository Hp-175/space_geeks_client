const express=require('express');
const bodyParser=require('body-parser');
const FacinatingTheorys = require('../models/FacinatingTheory');
const authenticate=require('../authenticate');
const fs=require('fs');

const FacinatingTheoryRouter=express.Router();

FacinatingTheoryRouter.use(bodyParser.json());
const cors=require('./cors');

FacinatingTheoryRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    FacinatingTheorys.find(req.query)
    .then((FacinatingTheory)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(FacinatingTheory);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    req.body.username=req.user.username;
    req.body._Id=req.user._id;
    FacinatingTheorys.create(req.body)
    .then((FacinatingTheory)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(FacinatingTheory);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /FacinatingTheorys');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    FacinatingTheorys.remove(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

FacinatingTheoryRouter.route('/:FacinatingTheoryId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheory)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(FacinatingTheory);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('post operation not supported for /FacinatingTheorys/'+req.params.FacinatingTheoryId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheor)=>{
        if(req.user._id!=FacinatingTheor._Id)
        {
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({'Error':'You are not allowed to change this post'});
        }
        else
        {
            FacinatingTheorys.findByIdAndUpdate(req.params.FacinatingTheoryId,{
                $set:req.body
            },{new:true})
            .then((FacinatingTheory)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(FacinatingTheory);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
    })
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{

    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheor)=>{
        if(req.user._id!=FacinatingTheor._Id)
        {
            err=new Error('You are not allowed to delete this post');
            err.status=403;
            return next(err);
        }
        else
        {
            fs.unlinkSync('./public/images/'+FacinatingTheor.image);
            FacinatingTheorys.findByIdAndRemove(req.params.FacinatingTheoryId)
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

FacinatingTheoryRouter.route('/:FacinatingTheoryId/comments/:commentId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheory)=>{
        var comment=FacinatingTheory.comments.find(({_id})=>req.params.commentId==_id);
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
    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheory)=>{
        req.body.username=req.user.username;
        FacinatingTheory.comments.push(req.body);
        FacinatingTheory.save()
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(FacinatingTheory);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /FacinatingTheorys/:FacinatingTheoryId/comments/:commentId');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    FacinatingTheorys.findById(req.params.FacinatingTheoryId)
    .then((FacinatingTheory)=>{
        var comment=FacinatingTheory.comments.find(({_id})=>req.params.commentId==_id);
        const ind=FacinatingTheory.comments.indexOf(comment);
        
            if(ind>-1&&comment.username===req.user.username)
            {
                FacinatingTheory.comments.splice(ind,1);
                FacinatingTheory.save()
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

module.exports=FacinatingTheoryRouter;