const {productSchema,reviewSchema} = require('./validation');
const expressError = require('./helpers/expressError');
const Shoe = require('./models/shoe');
const Review = require ('./models/review')
// const {r} = require('../validation');

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        
        req.flash('error', 'You are not signed in, Please log in to Continue!');
     return   res.redirect('/login');
    }
    next();
}

module.exports.validateShoe = (req,res,next)=>{
    const {error} = productSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new expressError(msg,400)
    }else{
        next();
    }
}


module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const products = await Shoe.findById(id);
     if (!products.author.equals(req.user._id)){
        req.flash('error', 'You are not authorised to edit this product!')
        return res.redirect(`/products/${products._id}`)
    
     }
     next ();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
     if (!review.author.equals(req.user._id)){
        req.flash('error', 'You are not authorised to edit this product!')
        return res.redirect(`/products/${id}`)
    
     }
     next ();
}
module.exports.validateReview= (req,res,next)=>{

    const {error} = reviewSchema.validate(req.body);  
    
    if (error){
       const msg = error.details.map(el=>el.message).join(',')
       throw new expressError(msg,400)
   }else{
       next();
   }
   
   }