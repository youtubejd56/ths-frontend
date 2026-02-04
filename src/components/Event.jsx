import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../api/config";

const API_BASE = API_BASE_URL.replace(/\/$/, "");

const Event = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/posts/`)
      .then((res) => {
        const postsArray = Array.isArray(res.data) ? res.data : (res.data.posts || []);

        const formatted = postsArray.map((post) => ({
          ...post,
          file: post.file
            ? (post.file.startsWith("http")
              ? post.file
              : `${API_BASE}${post.file.startsWith("/") ? "" : "/"}${post.file}`)
            : null,
        }));

        setPosts(formatted);

        const token = localStorage.getItem("token");
        setIsAdmin(!!token);
      })
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/") && !selectedFile.type.startsWith("video/")) {
      alert("Only image or video allowed!");
      return;
    }

    if (selectedFile.type.startsWith("image/") && selectedFile.size > 500 * 1024) {
      alert("Image must be < 500KB!");
      return;
    }

    setFile(selectedFile);
  };

  const handlePost = async () => {
    if (posts.length >= 4) {
      alert("Max 4 posts allowed!");
      return;
    }

    if (!file && !description.trim()) {
      alert("Add a file or description.");
      return;
    }

    if (wordCount > 20) {
      alert("Max 20 words allowed.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("description", description);

    try {
      const res = await axios.post(`${API_BASE}/api/posts/`, formData);
      const newPost = {
        ...res.data,
        file: res.data.file
          ? (res.data.file.startsWith("http")
            ? res.data.file
            : `${API_BASE}${res.data.file.startsWith("/") ? "" : "/"}${res.data.file}`)
          : null,
      };

      setPosts([newPost, ...posts]);
      setFile(null);
      setDescription("");
      setWordCount(0);
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    }
  };

  const handleRemovePost = async (id) => {
    if (!isAdmin) return;

    try {
      await axios.delete(`${API_BASE}/api/posts/${id}/`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 min-h-screen pb-32">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Event Posts</h2>

      {posts.length < 4 ? (
        isAdmin ? (
          <button
            onClick={() => setShowModal(true)}
            className="mb-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            + Create Staff Post
          </button>
        ) : (
          <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 shadow-sm max-w-2xl">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-amber-900 font-bold text-sm sm:text-base uppercase tracking-tight">Authorized Access Only</h4>
              <p className="text-amber-700 text-xs sm:text-sm mt-0.5 leading-relaxed font-medium">
                Media uploads are restricted to school personnel and authorized staff. Only school-related event pictures are permitted for publication.
              </p>
            </div>
          </div>
        )
      ) : (
        <p className="text-red-600 mb-6 font-bold text-sm sm:text-base flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          Maximum limit of 4 active posts reached.
        </p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2">
          <div
            className="w-full max-w-xs sm:max-w-md md:max-w-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-white/30"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Create New Post</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-black text-2xl">×</button>
            </div>

            <label className="border border-dashed rounded-xl cursor-pointer h-48 flex flex-col justify-center items-center mb-4 bg-white/20 w-full">
              {file ? (
                file.type.startsWith("video/") ? (
                  <video className="max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-60 rounded" controls>
                    <source src={URL.createObjectURL(file)} />
                  </video>
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-60 rounded object-contain"
                  />
                )
              ) : (
                <>
                  <span className="text-gray-700 text-sm sm:text-base">Click to upload</span>
                  <span className="text-gray-800 text-xs sm:text-sm">Image (&lt;500KB) Jpg or Png</span>
                </>
              )}
              <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
            </label>

            <p className="text-sm sm:text-base font-medium text-black mb-1">Description</p>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
              }}
              placeholder="Share what makes this moment special..."
              className="w-full rounded-lg p-2 sm:p-3 md:p-4 border text-sm sm:text-base bg-white/40 backdrop-blur"
              rows={3}
            />
            <p className="text-xs sm:text-sm text-black mt-1">{wordCount}/20 words</p>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 sm:px-5 sm:py-3 rounded bg-white/50 hover:bg-white/70 text-sm sm:text-base">
                Cancel
              </button>
              <button onClick={handlePost} className="px-5 py-2 sm:px-6 sm:py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base">
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col h-full">
              {post.file && (
                <div className="w-full max-h-60 sm:max-h-64 md:max-h-72 flex items-center justify-center overflow-hidden rounded-lg mb-3 bg-gray-100">
                  {post.file.endsWith(".mp4") || post.file.endsWith(".webm") ? (
                    <video controls className="max-h-60 sm:max-h-64 md:max-h-72 w-auto object-contain rounded">
                      <source src={post.file} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={post.file} alt="" className="max-h-60 sm:max-h-64 md:max-h-72 w-auto object-contain" />
                  )}
                </div>
              )}

              {post.description && (
                <p className="text-gray-800 text-sm sm:text-base mt-2 wrap-break-word line-clamp-4">{post.description}</p>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleRemovePost(post.id)}
                  className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-1 sm:px-5 sm:py-2 rounded text-sm sm:text-base w-fit"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">No posts yet.</p>
      )}
    </div>
  );
};

export default Event;
