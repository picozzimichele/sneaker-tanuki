import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String },
        image: { type: String },
        bio: { type: String },
        birthday: { type: Date },
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        twitter: { type: String },
        github: { type: String },
        website: { type: String },
        instagram: { type: String },
        whatsapp: { type: String },
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
