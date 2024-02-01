import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!)
mongoose.Promise = global.Promise

const userSchema = new Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        email: String
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User