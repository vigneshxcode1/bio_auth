import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  fingerprint: {
    attestationObject: { type: String, required: true },
    clientDataJSON: { type: String, required: true },
  },
});

const UserModel = mongoose.model("Userauths", userSchema);
export default UserModel;
