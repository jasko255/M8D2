import express from "express"
import AuthorModel from "./schema.js"
// import { basicAuthMiddleware } from "../../auth/basic.js"
// import { adminOnlyMiddleware } from "../../auth/admin.js"

const authorsRouter = express.Router()

authorsRouter.post("/register", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
    console.log(error);
  }
})

authorsRouter.get("/",  async (req, res, next) => {
  try {
    const authors = await AuthorModel.find()
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/me",  async (req, res, next) => {
  // basicAuthMiddleware is going also to modify req object and attach the "logged in" Author to it --> req.Author
  try {
    res.send(req.Author)
  } catch (error) {
    next(error)
  }
})

authorsRouter.put("/me",  async (req, res, next) => {
  try {
    req.Author.name = "John"

    await req.Author.save()
    res.send()
  } catch (error) {
    next(error)
  }
})

authorsRouter.delete("/me",  async (req, res, next) => {
  try {
    await req.Author.deleteOne()
    res.send()
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/:AuthorId",   async (req, res, next) => {
  try {
    const Author = await AuthorModel.findById(req.params.AuthorId)
    res.send(Author)
  } catch (error) {
    next(error)
  }
})

export default authorsRouter
