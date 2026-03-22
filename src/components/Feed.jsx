import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  deletePost,
  addComment,
  updatePost,
} from "../redux/postSlice";
import { useState } from "react";

export default function Feed() {
  const posts = useSelector((state) => state.posts.list);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(3);
  const [commentText, setCommentText] = useState({});
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (post) => {
    setEditId(post.id);
    setEditText(post.text);
  };

  const saveEdit = (post) => {
    dispatch(
      updatePost({
        ...post,
        text: editText,
      }),
    );
    setEditId(null);
  };

  const handleAddComment = (postId) => {
    const text = commentText[postId];

    if (!text || !text.trim()) return;

    dispatch(
      addComment({
        id: postId,
        comment: text,
      }),
    );

    setCommentText({
      ...commentText,
      [postId]: "",
    });
  };

  return (
    <div>
      {posts.slice(0, visible).map((post) => (
        <div key={post.id} className="bg-white p-4 shadow rounded mb-4">
          <h3 className="font-bold">{post.username}</h3>
          <p className="text-gray-500 text-sm">{post.time}</p>

          {/* EDIT MODE */}
          {editId === post.id ? (
            <div>
              <textarea
                className="border w-full p-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <button
                onClick={() => saveEdit(post)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mt-2">{post.text}</p>
          )}

          {/* IMAGE */}
          {post.image && <img src={post.image} className="mt-2 rounded" />}

          {/* STATUS */}
          {post.status === "Uploading" && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${post.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                Uploading {post.progress || 0}%
              </p>
            </div>
          )}

          <p className="text-sm mt-2">
            Status:
            <span
              className={`ml-1 px-2 py-1 text-white text-xs rounded ${
                post.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {post.status}
            </span>
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => dispatch(likePost(post.id))}
              className="text-blue-500"
            >
              👍 {post.likes}
            </button>

            <button
              onClick={() => startEdit(post)}
              className="text-yellow-600 border border-yellow-500 px-2 py-1 rounded hover:bg-yellow-500 hover:text-white"
            >
              Edit
            </button>

            <button
              onClick={() => dispatch(deletePost(post.id))}
              className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>

          {/* COMMENTS */}
          <div className="mt-3">
            <input
              className="border p-1 w-full"
              placeholder="Add comment"
              value={commentText[post.id] || ""}
              onChange={(e) =>
                setCommentText({
                  ...commentText,
                  [post.id]: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddComment(post.id);
                }
              }}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              onClick={() => handleAddComment(post.id)}
            >
              Add
            </button>
          </div>

          {/* COMMENT LIST */}
          {(post.comments || []).map((c, i) => (
            <p key={i} className="text-sm text-gray-600">
              💬 {c}
            </p>
          ))}
        </div>
      ))}

      <button
        onClick={() => setVisible((v) => v + 10)}
        className="bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded justify-center flex mx-auto"
      >
        Load More
      </button>
    </div>
  );
}
