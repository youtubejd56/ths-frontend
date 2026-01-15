import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api/config";

const API_BASE = API_BASE_URL.replace(/\/$/, "");

const ManageEventPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editPost, setEditPost] = useState(null);
    const [editText, setEditText] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/posts/`);

            const data = Array.isArray(res.data.posts) ? res.data.posts : [];

            const formatted = data.map((post) => ({
                ...post,
                file: post.file
                    ? post.file.startsWith("http")
                        ? post.file
                        : `${API_BASE}${post.file.startsWith("/") ? "" : "/"}${post.file}`
                    : null,
            }));

            setPosts(formatted);
        } catch (error) {
            console.error("Failed to load posts:", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${API_BASE}/api/posts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Delete failed — only Admin can delete");
        }
    };

    const handleEditSave = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `${API_BASE}/api/posts/${editPost.id}/`,
                { description: editText },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPosts((prev) =>
                prev.map((p) =>
                    p.id === editPost.id ? { ...p, description: editText } : p
                )
            );

            // sync Event page
            window.dispatchEvent(new Event("posts-updated"));

            setEditPost(null);
            setEditText("");
        } catch (error) {
            console.error("Edit failed:", error);
            alert("Failed to update description");
        }
    };

    if (loading) return <p>Loading posts...</p>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Event Posts</h2>

            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                            {post.file && (
                                <div className="w-full max-h-60 flex items-center justify-center overflow-hidden rounded-lg mb-3 bg-gray-100">
                                    {post.file.endsWith(".mp4") || post.file.endsWith(".webm") ? (
                                        <video controls className="max-h-60 w-auto object-contain rounded">
                                            <source src={post.file} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img src={post.file} alt="" className="max-h-60 w-auto object-contain rounded" />
                                    )}
                                </div>
                            )}

                            {editPost?.id === post.id ? (
                                <>
                                    <textarea
                                        className="border p-2 text-sm w-full"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button
                                        onClick={handleEditSave}
                                        className="mt-2 bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded text-sm w-fit"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    {post.description && (
                                        <p className="text-gray-800 text-sm mt-2 break-words line-clamp-4">
                                            {post.description}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => {
                                            setEditPost(post);
                                            setEditText(post.description || "");
                                        }}
                                        className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded text-sm w-fit"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => handleDelete(post.id)}
                                className="mt-2 bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded text-sm w-fit"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageEventPosts;
