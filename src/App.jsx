import CreatePost from "./components/CreatePost";
import Feed from "./components/Feed";
import UploadQueue from "./components/UploadQueue";

export default function App() {

  return (

    <div className="max-w-xl mx-auto mt-10 bg-gray-100 p-4 rounded shadow">

      <h1 className="text-2xl font-bold mb-4 justify-center flex">
        My Social Feed WebApp
      </h1>
      <UploadQueue/>

      <CreatePost />

      <Feed />

    </div>

  );
}