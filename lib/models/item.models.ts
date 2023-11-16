import mongoose, { Schema, models } from "mongoose";

const itemSchema = new Schema(
    {
        itemDescription: { type: String, required: true },
        itemColor: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        currency: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);

const Item = models.Item || mongoose.model("Item", itemSchema);

export default Item;
