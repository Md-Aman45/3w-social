import { useState, useRef } from "react";
import { Paper, TextField, Button, Box, IconButton, Typography, Divider, Popover } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/axios.js";

const EMOJIS = ["😀", "😂", "😍", "🔥", "🎉", "👍", "🙌", "💯", "😎", "🥳", "❤️", "😢", "😮", "🤔", "🙏", "🚀"];

const CreatePost = ({ onPostCreated, tab, onTabChange }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const insertEmoji = (emoji) => {
    setText((t) => t + emoji);
    setEmojiAnchor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    setLoading(true);
    try {
      const { data } = await api.post("/posts", {
        text: text.trim(),
        image: imagePreview,
        isPromoted,
      });
      onPostCreated(data);
      setText("");
      setImagePreview("");
      setIsPromoted(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        mb: 2.5,
        borderRadius: 4,
        bgcolor: "#fff",
        border: "none",
        boxShadow: "0 2px 10px rgba(20,30,60,0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography
          sx={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: 26,
            color: "#1a1a2e",
            fontWeight: 700,
          }}
        >
          Create Post
        </Typography>

        <Box sx={{ display: "flex", bgcolor: "#eef1f6", borderRadius: 99, p: 0.4 }}>
          <Box
            onClick={() => onTabChange("all")}
            sx={{
              px: 2,
              py: 0.6,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor: tab === "all" ? "#2f6fed" : "transparent",
              color: tab === "all" ? "#fff" : "#7c879b",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 15,
              fontWeight: 700,
              transition: "all 0.15s ease",
            }}
          >
            All Posts
          </Box>
          <Box
            onClick={() => onTabChange("promotions")}
            sx={{
              px: 2,
              py: 0.6,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor: tab === "promotions" ? "#2f6fed" : "transparent",
              color: tab === "promotions" ? "#fff" : "#7c879b",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 15,
              fontWeight: 700,
              transition: "all 0.15s ease",
            }}
          >
            Promotions
          </Box>
        </Box>
      </Box>

      <TextField
        fullWidth
        multiline
        minRows={2}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontFamily: "'Patrick Hand', cursive",
            fontSize: 19,
            color: "#1a1a2e",
          },
        }}
      />

      {imagePreview && (
        <Box sx={{ position: "relative", mt: 1, display: "inline-block" }}>
          <img
            src={imagePreview}
            alt="preview"
            style={{ maxHeight: 220, borderRadius: 12, display: "block" }}
          />
          <IconButton
            size="small"
            onClick={() => {
              setImagePreview("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              bgcolor: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      )}

      {isPromoted && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
            px: 1.5,
            py: 0.4,
            borderRadius: 99,
            bgcolor: "#fff4e0",
            color: "#b8761a",
          }}
        >
          <CampaignOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontFamily: "'Patrick Hand', cursive", fontSize: 14 }}>
            This post will be marked as a promotion
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton component="label" sx={{ color: "#2f6fed" }}>
            <CameraAltOutlinedIcon />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </IconButton>

          <IconButton sx={{ color: "#2f6fed" }} onClick={(e) => setEmojiAnchor(e.currentTarget)}>
            <SentimentSatisfiedAltOutlinedIcon />
          </IconButton>
          <Popover
            open={Boolean(emojiAnchor)}
            anchorEl={emojiAnchor}
            onClose={() => setEmojiAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Box sx={{ p: 1.5, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 0.5, maxWidth: 280 }}>
              {EMOJIS.map((emoji) => (
                <Box
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    textAlign: "center",
                    p: 0.5,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "#f0f2f7" },
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>
          </Popover>

          <IconButton sx={{ color: "#2f6fed" }}>
            <MenuOutlinedIcon />
          </IconButton>

          <Box
            onClick={() => setIsPromoted((p) => !p)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              ml: 1,
              px: 1,
              py: 0.4,
              borderRadius: 99,
              color: isPromoted ? "#fff" : "#2f6fed",
              bgcolor: isPromoted ? "#2f6fed" : "transparent",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <CampaignOutlinedIcon fontSize="small" />
            <Typography sx={{ fontFamily: "'Patrick Hand', cursive", fontSize: 17 }}>
              {isPromoted ? "Promoted" : "Promote"}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          disabled={loading || (!text.trim() && !imagePreview)}
          onClick={handleSubmit}
          startIcon={<SendIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: "#2f6fed",
            borderRadius: 99,
            px: 3,
            fontFamily: "'Patrick Hand', cursive",
            fontSize: 17,
            "&:hover": { bgcolor: "#1d57d6" },
          }}
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;
