import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
    {
        paymentIntentId: { type: String, unique: true },
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        currency: { type: String },
        status: { type: String },
        deliveryStatus: { type: String },
        depositAmount: { type: Number },
    },
    { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
