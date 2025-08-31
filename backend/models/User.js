import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Buyer", "Seller", "Dealer"], // optional: restrict to allowed roles
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // optional: ensure uniqueness
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10);
  next();
});

const User = mongoose.models.User || model("User", schema);
export default User;
