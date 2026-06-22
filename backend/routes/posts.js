const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/auth");

const router = express.Router();

// @route POST /api/posts  (create post - text and/or image)
router.post("/", protect, async (req, res) => {
  try {
    const { text, image, isPromoted } = req.body;
    if (!text && !image) {
      return res.status(400).json({ message: "Post must have text or image" });
    }

    const post = await Post.create({
      author: req.user.id,
      username: req.user.username,
      text: text || "",
      image: image || "",
      isPromoted: !!isPromoted,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route GET /api/posts?page=1&limit=10  (public feed, paginated, newest first)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.promoted === "true" ? { isPromoted: true } : {};

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.countDocuments(filter),
    ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route PUT /api/posts/:id/like  (toggle like)
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.some(
      (l) => l.user.toString() === req.user.id
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((l) => l.user.toString() !== req.user.id);
    } else {
      post.likes.push({ user: req.user.id, username: req.user.username });
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route POST /api/posts/:id/comment
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      username: req.user.username,
      text: text.trim(),
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route PUT /api/posts/:id/share  (increment share count)
router.put("/:id/share", protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { shareCount: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
