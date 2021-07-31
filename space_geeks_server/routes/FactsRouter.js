const express=require('express');
const bodyParser=require('body-parser');
const Facts = require('../models/Facts');
const authenticate=require('../authenticate');
const fs=require('fs');

const FactRouter=express.Router();

const cors=require('./cors');

FactRouter.use(bodyParser.json());

FactRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Facts.find(req.query)
    .then((Fact)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Fact);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    req.body.username=req.user.username;
    req.body._Id=req.user._id;
    Facts.create(req.body)
    .then((Fact)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Fact);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /Facts');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Facts.remove(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

FactRouter.route('/:FactId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Facts.findById(req.params.FactId)
    .then((Fact)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Fact);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('post operation not supported for /Facts/'+req.params.FactId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Facts.findById(req.params.FactId)
    .then((Factfound)=>{
        if(req.user._id!=Factfound._Id)
        {
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({'Error':'You are not allowed to change this post'});
        }
        else
        {
            Facts.findByIdAndUpdate(req.params.FactId,{
                $set:req.body
            },{new:true})
            .then((Fact)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(Fact);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
    })
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Facts.findById(req.params.FactId)
    .then((Factfound)=>{
        if(req.user._id!=Factfound._Id)
        {
            err=new Error('You are not allowed to delete this post');
            err.status=403;
            return next(err);
        }
        else
        {
            fs.unlinkSync('./public/images/'+Factfound.image);
            Facts.findByIdAndRemove(req.params.FactId)
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

FactRouter.route('/:FactId/comments/:commentId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Facts.findById(req.params.FactId)
    .then((Fact)=>{
        var comment=Fact.comments.find(({_id})=>req.params.commentId==_id);
        console.log(comment);
        if(comment==null||comment==undefined)
        {
            err=new Error('Comment nt found');
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
    Facts.findById(req.params.FactId)
    .then((Fact)=>{
        req.body.username=req.user.username;
        Fact.comments.push(req.body);
        Fact.save()
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(Fact);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /Facts/:FactId/comments/:commentId');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Facts.findById(req.params.FactId)
    .then((Fact)=>{
        var comment=Fact.comments.find(({_id})=>req.params.commentId==_id);
        const ind=Fact.comments.indexOf(comment);
        
            if(ind>-1&&comment.username===req.user.username)
            {
                Fact.comments.splice(ind,1);
                Fact.save()
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

module.exports=FactRouter;