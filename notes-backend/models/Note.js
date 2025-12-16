const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String } // for image upload
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
