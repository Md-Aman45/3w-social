import { useState } from "react";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Collapse,
  Divider,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendIcon from "@mui/icons-material/Send";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const monthDay = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [following, setFollowing] = useState(false);

  const isLiked = post.likes.some(
    (l) => l.user === user.id || l.user?._id === user.id,
  );
  const isOwnPost = post.username === user.username;

  const handleLike = async () => {
    try {
      const { data } = await api.put(`/posts/${post._id}/like`);
      onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/posts/${post._id}/comment`, {
        text: commentText.trim(),
      });
      onUpdate(data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/post/${post._id}`;

      if (navigator.share) {
        await navigator.share({
          title: `${post.username}'s Post`,
          text: post.text || "Check out this post",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "#2f6fed", width: 44, height: 44 }}>
            {post.username?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: 19,
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.2,
              }}
            >
              {post.username}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#9aa3b5" }}>
              @{post.username.toLowerCase()}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "#b1b8c6" }}>
              {monthDay(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        {!isOwnPost && (
          <Button
            size="small"
            onClick={() => setFollowing((f) => !f)}
            sx={{
              bgcolor: following ? "#eef1f6" : "#2f6fed",
              color: following ? "#5b6478" : "#fff",
              borderRadius: 99,
              px: 2.2,
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 15,
              fontWeight: 700,
              "&:hover": { bgcolor: following ? "#e2e6ee" : "#1d57d6" },
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>
        )}
      </Box>

      {post.text && (
        <Typography
          sx={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: 20,
            fontWeight: 700,
            color: "#1a1a2e",
            mb: post.image ? 1.5 : 1,
            whiteSpace: "pre-wrap",
          }}
        >
          {post.text}
        </Typography>
      )}

      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt="post"
          sx={{
            width: "100%",
            maxHeight: 480,
            objectFit: "cover",
            borderRadius: 3,
            mb: 1,
          }}
        />
      )}

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Box
          onClick={handleLike}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            cursor: "pointer",
          }}
        >
          <IconButton
            size="small"
            sx={{ color: isLiked ? "#e84343" : "#9aa3b5", p: 0 }}
          >
            {isLiked ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <Typography
            sx={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 17,
              color: "#5b6478",
            }}
          >
            {post.likes.length}
          </Typography>
        </Box>

        <Box
          onClick={() => setShowComments((s) => !s)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            cursor: "pointer",
          }}
        >
          <ChatBubbleOutlineIcon fontSize="small" sx={{ color: "#141415" }} />
          <Typography
            sx={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 17,
              color: "#000000",
            }}
          >
            {post.comments.length}
          </Typography>
        </Box>

        <Box
          onClick={handleShare}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <ShareOutlinedIcon
            fontSize="small"
            sx={{
              color: "#383a3c",
            }}
          />

          <Typography
            sx={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: 17,
              color: "#5b6478",
            }}
          >
            Share
          </Typography>
        </Box>
      </Box>

      <Collapse in={showComments}>
        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
          {post.comments.map((c) => (
            <Box
              key={c._id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "#2563eb",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {c.username?.[0]?.toUpperCase()}
              </Avatar>

              <Box>
                <Box
                  sx={{
                    bgcolor: "#f3f4f6",
                    px: 1.5,
                    py: 1,
                    borderRadius: "16px",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.2,
                    }}
                  >
                    {c.username}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#1f2937",
                      mt: 0.3,
                      wordBreak: "break-word",
                    }}
                  >
                    {c.text}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          component="form"
          onSubmit={handleComment}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#2563eb",
            }}
          >
            {user.username?.[0]?.toUpperCase()}
          </Avatar>

          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                bgcolor: "#f3f4f6",
              },
              "& input": {
                color: "#000",
              },
            }}
          />

          <IconButton
            type="submit"
            disabled={!commentText.trim()}
            sx={{
              bgcolor: "#2563eb",
              color: "#fff",
              width: 40,
              height: 40,
              "&:hover": {
                bgcolor: "#1d4ed8",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default PostCard;
