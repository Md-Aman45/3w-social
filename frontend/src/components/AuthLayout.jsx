import { Box, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const FloatingCard = ({ top, left, delay, children }) => (
  <Box
    sx={{
      position: "absolute",
      top,
      left,
      animation: `float 6s ease-in-out ${delay}s infinite`,
      "@keyframes float": {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-14px)" },
      },
    }}
  >
    {children}
  </Box>
);

const MiniPost = ({ width = 200 }) => (
  <Box
    sx={{
      width,
      p: 1.5,
      borderRadius: 3,
      bgcolor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
    }}
  >
    <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6366f1,#22d3ee)",
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ width: "60%", height: 6, borderRadius: 4, bgcolor: "rgba(255,255,255,0.25)" }} />
      </Box>
    </Stack>
    <Box sx={{ width: "90%", height: 6, borderRadius: 4, bgcolor: "rgba(255,255,255,0.15)", mb: 0.6 }} />
    <Box sx={{ width: "70%", height: 6, borderRadius: 4, bgcolor: "rgba(255,255,255,0.15)", mb: 1 }} />
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Stack direction="row" spacing={0.4} alignItems="center">
        <FavoriteIcon sx={{ fontSize: 13, color: "#22d3ee" }} />
        <Typography variant="caption" sx={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
          24
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.4} alignItems="center">
        <ChatBubbleIcon sx={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }} />
        <Typography variant="caption" sx={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
          6
        </Typography>
      </Stack>
    </Stack>
  </Box>
);

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.25), transparent 50%), #0b0e1a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <FloatingCard top="18%" left="12%" delay={0}>
            <MiniPost width={190} />
          </FloatingCard>
          <FloatingCard top="55%" left="38%" delay={1.4}>
            <MiniPost width={210} />
          </FloatingCard>
          <FloatingCard top="14%" left="55%" delay={0.8}>
            <MiniPost width={170} />
          </FloatingCard>
        </Box>

        <Box sx={{ position: "absolute", bottom: 64, left: 56, right: 56 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              background: "linear-gradient(90deg,#fff,#a5b4fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Where your circle posts.
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
            Share a thought, a photo, or both — and see what your circle's
            reacting to, in real time.
          </Typography>
        </Box>
      </Box>

      {/* Form panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 6, md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
