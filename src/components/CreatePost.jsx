import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handlePost = () => {
    if (!text && !image) {
      alert("Add text or image");
      return;
    }

    const post = {
      id: Date.now(),
      username: "Dinesh",
      image: image ? URL.createObjectURL(image) : null,
      text,
      likes: 0,
      comments: [],
      time: new Date().toLocaleString(),
      status: navigator.onLine ? "Success" : "Pending",
    };

    dispatch(addPost(post));

    setText("");
    setImage(null);
  };

  return (
    <div className="bg-gray-100 p-4 shadow rounded mb-4">
      <textarea
        className="w-full border p-2"
        placeholder="Write post..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        className="mt-1 border bg-gray-200 p-2"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded justify-end flex"
      >
        Post upload
      </button>
    </div>
  );
}
