require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow base64 images
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => res.send("3W Social API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
