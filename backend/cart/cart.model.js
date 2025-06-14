import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  tenantId: { type: mongoose.ObjectId, required: true, ref: "User" },
  propertyId: { type: mongoose.ObjectId, required: true, ref: "Product" },
});
const CartTable = mongoose.model("Cart", cartSchema);
export default CartTable;
