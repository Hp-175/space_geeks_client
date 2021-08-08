const express=require('express');
const bodyParser=require('body-parser');
const Users = require('../models/user');
const authenticate=require('../authenticate');

const FavouriteRouter=express.Router();

const cors=require('./cors');

FavouriteRouter.use(bodyParser.json());

FavouriteRouter.route('/favouriteAchievements')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(user.favoriteAchievements);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        user.favoriteAchievements.push(req.body._id);
        user.save()
        .then((fav)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(fav);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /Favourite/favouriteAchievements');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        var Fav=user.favoriteAchievements.find(({_id})=>req.body._id==_id);
        const ind=user.favoriteAchievements.indexOf(Fav);
            if(ind>-1)
            {
                user.favoriteAchievements.splice(ind,1);
                user.save()
                .then((resp)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            else
            {
                err=new Error('Favorite item not found in your list');
                err.status=403;
                return next(err);
            }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

FavouriteRouter.route('/favouriteFacts')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(user.favoriteFacts);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        user.favoriteFacts.push(req.body._id);
        user.save()
        .then((fav)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(fav);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /Favourite/favouriteFacts');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        var Fav=user.favoriteFacts.find(({_id})=>req.body._id==_id);
        const ind=user.favoriteFacts.indexOf(Fav);
            if(ind>-1)
            {
                user.favoriteFacts.splice(ind,1);
                user.save()
                .then((resp)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            else
            {
                err=new Error('Favorite item not found in your list');
                err.status=403;
                return next(err);
            }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

FavouriteRouter.route('/favouriteTheories')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(user.favoriteTheories);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        user.favoriteTheories.push(req.body._id);
        user.save()
        .then((fav)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(fav);
        },(err)=>next(err))
        .catch((err)=>next(err));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /Favourite/favoriteTheories');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('favoriteAchievements').populate('favoriteTheories').populate('favoriteFacts')
    .then((user)=>{
        var Fav=user.favoriteTheories.find(({_id})=>req.body._id==_id);
        const ind=user.favoriteTheories.indexOf(Fav);
            if(ind>-1)
            {
                user.favoriteTheories.splice(ind,1);
                user.save()
                .then((resp)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            else
            {
                err=new Error('Favorite item not found in your list');
                err.status=403;
                return next(err);
            }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=FavouriteRouter;