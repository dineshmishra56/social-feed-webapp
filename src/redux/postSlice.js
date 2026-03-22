import { createSlice } from "@reduxjs/toolkit";

const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: savedPosts,
  },

  reducers: {
    addPost: (state, action) => {
      state.list.unshift({
        ...action.payload,
        status: "Pending",
      });

      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    updatePost: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      state.list[index] = action.payload;

      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    deletePost: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);

      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    likePost: (state, action) => {
      const post = state.list.find((p) => p.id === action.payload);
      post.likes += 1;

      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    addComment: (state, action) => {
      const { id, comment } = action.payload;
      const post = state.list.find((p) => p.id === id);

      post.comments.push(comment);

      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    markSuccess: (state, action) => {
      const post = state.list.find((p) => p.id === action.payload);
      post.status = "Success";

      // ✅ ADD THIS
      localStorage.setItem("posts", JSON.stringify(state.list));
    },
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      const post = state.list.find((p) => p.id === id);

      if (post) {
        post.progress = progress;
      }
      // ✅ ADD THIS
      localStorage.setItem("posts", JSON.stringify(state.list));
    },

    markUploading: (state, action) => {
      const post = state.list.find((p) => p.id === action.payload);

      if (post) {
        post.status = "Uploading";
      }
      // ✅ ADD THIS
      localStorage.setItem("posts", JSON.stringify(state.list));
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  markSuccess,
  updateProgress,
  markUploading,
} = postSlice.actions;

export default postSlice.reducer;
