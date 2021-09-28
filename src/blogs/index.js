import express from "express";
import Blogs from "./schema.js";
import { checkBlogPostSchema, checkValidationResult } from "./validation.js";

const router = express.Router();

// get all blogs
router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blogs.find({});
    res.send(blogs);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


// create  blog
router.post(
  "/",
  checkBlogPostSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const blog = await new Blogs(req.body).save();
      res.status(201).send(blog);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);



router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    } else {
      res.send(blog);
    }
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete  blog
router.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    } else {
      await Blogs.findByIdAndDelete(req.params.id);
      res.status(204).send();
    }
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update blog
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


export default router;
