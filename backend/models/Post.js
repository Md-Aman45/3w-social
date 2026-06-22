const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    text: { type: String, default: "" },
    image: { type: String, default: "" }, // base64 data URL
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
      },
    ],
    comments: [commentSchema],
    isPromoted: { type: Boolean, default: false },
    shareCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
