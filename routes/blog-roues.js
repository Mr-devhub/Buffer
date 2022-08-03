import express from "express";

const router = express.Router();

import { addBlog, getAllBlogs, updateBlog, getBlogById, deleteBlogById, userBlogs} from '../controllers/blog-controller';

router.post("/addblog", addBlog);

router.get("/allblogs", getAllBlogs);

router.put("/update/:id", updateBlog);

router.get("/blog/:id", getBlogById);

router.delete("/delete/:id", deleteBlogById);

router.get("/user/blogs/:id", userBlogs);

export default router;