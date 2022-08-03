import mongoose from "mongoose";
import Blog from '../model/Blog';
import User from '../model/User';

export const addBlog = async(req, res, next) => {

      const {title, description, image, user} = req.body;

      let exectinguser;

      try{
        exectinguser = await User.findById(user);
      }catch(err){
        return console.log(err);
      }

      if(!exectinguser){
        return res.status(400).json({message:"User Not Found"});
      }

      const blog = new Blog({
          title,
          description,
          image,
          user
      });

      try{

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exectinguser.blogs.push(blog);
        await exectinguser.save({session});
        await session.commitTransaction();


      }catch(err){
        return console.log(err);
      }

      return res.status(200).json({blog});
      
}

export const getAllBlogs = async (req, res, next)=>{

       let blogs;

       try{
           blogs = await Blog.find().populate("user");
       }catch(err){
        return console.log(err);
       }
       if(!blogs){
        return res.status(404).json({message:"No Blogs Found"});
       }

       return res.status(200).json({blogs});
}

export const updateBlog = async (req, res, next) =>{
    
      const {title, description} = req.body;

      const blogId = req.params.id;

      let blog;

      try{
          blog = await Blog.findByIdAndUpdate(blogId , {title, description });
      }catch(err){
        return console.log(err);
      }

      if(!blog){

         return res.status(500).json({message:"Unable to update the blog"});
      }
       
      return res.status(200).json({blog});
}

export const getBlogById =  async (req, res, next) =>{

      const blogId = req.params.id;
      
      let blog; 

      try{
        blog = await Blog.findById(blogId);
      }catch(err){
        return console.log(err);
      }

      if(!blog){
        return res.status(400).json({mesage:"No Blogs Found"});
      }
      
      res.status(200).json({blog});
      
}

export const deleteBlogById = async (req,res,next) =>{

    const blogId = req.params.id;

     let blog;

     try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
     } catch(err){
         console.log(err);
     }

     if(!blog){
        return res.status(500).json({message:"Unable to Delete"});
     }

     return res.status(200).json({message:"Delete successfull"});
}

export const userBlogs = async (req, res, next) => {
    
       const userId = req.params.id;
       
       let usersBlogs;

       try{
          usersBlogs = await User.findById(userId).populate("blogs");
       }catch(err){
          return console.log(err);
       }

       if(!usersBlogs){
             return res.status(404).json({message: "No Blogs Found"});
       }
       
       return res.status(200).json({user:usersBlogs});
}