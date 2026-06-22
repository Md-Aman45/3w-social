import { useEffect, useState, useCallback } from "react";
import { Box, Container, Button, CircularProgress, Typography } from "@mui/material";
import CreatePost from "../components/CreatePost.jsx";
import PostCard from "../components/PostCard.jsx";
import api from "../api/axios.js";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tab, setTab] = useState("all"); // 'all' | 'promotions'

  const fetchPosts = useCallback(
    async (pageNum) => {
      const promotedParam = tab === "promotions" ? "&promoted=true" : "";
      const { data } = await api.get(`/posts?page=${pageNum}&limit=10${promotedParam}`);
      return data;
    },
    [tab]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchPosts(1);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(1);
      setLoading(false);
    })();
  }, [fetchPosts]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const data = await fetchPosts(nextPage);
    setPosts((prev) => [...prev, ...data.posts]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const handlePostCreated = (newPost) => {
    if (tab === "promotions" && !newPost.isPromoted) return;
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <Box sx={{ bgcolor: "#f3f5f9", minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <CreatePost onPostCreated={handlePostCreated} tab={tab} onTabChange={setTab} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress sx={{ color: "#2f6fed" }} />
          </Box>
        ) : posts.length === 0 ? (
          <Typography sx={{ color: "#9aa3b5", textAlign: "center", mt: 6, fontFamily: "'Patrick Hand', cursive", fontSize: 20 }}>
            {tab === "promotions"
              ? "No promotions yet. Tap Promote on a post to feature it here!"
              : "No posts yet. Be the first to share something!"}
          </Typography>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onUpdate={handleUpdate} />
            ))}

            {page < totalPages && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  sx={{
                    borderRadius: 99,
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: 16,
                    color: "#2f6fed",
                    borderColor: "#2f6fed",
                  }}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Feed;
