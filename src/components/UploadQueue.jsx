import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markSuccess, updateProgress, markUploading } from "../redux/postSlice";

function UploadQueue() {
  const posts = useSelector((state) => state.posts.list);
  const dispatch = useDispatch();

  const activeUploads = useRef({});

  useEffect(() => {
    if (!navigator.onLine) return;

    posts.forEach((post) => {
      if (post.status !== "Pending" || activeUploads.current[post.id]) {
        return;
      }

      activeUploads.current[post.id] = true;

      dispatch(markUploading(post.id));

      let progress = post.progress || 0;

      const interval = setInterval(() => {
        progress += 20;

        dispatch(
          updateProgress({
            id: post.id,
            progress,
          }),
        );

        if (progress >= 100) {
          clearInterval(interval);
          dispatch(markSuccess(post.id));
          delete activeUploads.current[post.id];
        }
      }, 500);
    });
  }, [posts, dispatch]);

  return null;
}

export default UploadQueue;
