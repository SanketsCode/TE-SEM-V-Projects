const Post = require('../model/post.model');
const slugify = require('slugify');

function GetPosts(req,res){
    Post.find({})
    .limit(10)
    .sort({createdAt: -1})
    .exec((err,posts) => {
        if(err) console.log(err);
        res.json(posts)
    });
}

function CreatePost(req,res){
    const {title,content,user,imgUrl} = req.body;
    const slug = slugify(title); //my Post my-post
    //validate
    if(!title || !content){
        return res.status(400).json({error :"Title or Content is Missing"});
    }
    
    Post.create({
        title,
        content,
        user,
        slug,
        imgUrl
    },(err,post) => {
        if(err){
           return res.status(400).json({error:` Duplicate post. Try another title`});
        }

        res.status(200).json(post);
    });


    
}

function read(req,res){
    const {slug} = req.params;
    // console.log(req.params.slug);
    Post.findOne({slug})
    .exec((err,post) => {
        if(err) console.log(err);
        res.json(post);
    })
}


//update 
function update(req,res){
    const {slug} = req.params;
    const {title,content,user,imgUrl} = req.body;
    const newSlug = slugify(title); //my Post my-post
    //validate
    if(!title || !content){
        return res.status(400).json({error :"Title or Content is Missing"});
    }
    Post.findOneAndUpdate({slug},{title,content,user,slug:newSlug,imgUrl},{new:true})
    .exec((err,post) => {
        if(err) console.log(err);
        res.json(post);
    });
}

//delete
function remove(req,res){
    const {slug} = req.params;
    Post.findOneAndDelete({slug}).exec((err,post) => {
        if(err) console.log(err);
        res.json({
            message:"Post Deleted"
        })
    })
}



module.exports = {
    GetPosts,
    CreatePost,
    read,
    remove,
    update
}
