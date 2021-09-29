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



AuthorSchema.pre("save", async function (next) {
  // used not only on creation but also when user document is being modified (PUT)
  // BEFORE saving the user in db, hash the password
  const newAuthor = this
  const plainPW = newAuthor.password

  if (newAuthor.isModified("password")) {
    // only if user is modifying the password we are going to "waste" CPU cycles in running hash function
    newAuthor.password = await bcrypt.hash(plainPW, 10)
  }
  next()
})



export default model("Author", AuthorSchema)