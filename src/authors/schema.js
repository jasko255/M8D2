import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
   
  },
  { timestamps: true }
)

export default model("Author", AuthorSchema)