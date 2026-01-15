import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api/config";

const API_BASE = API_BASE_URL.replace(/\/$/, "");

const ManageEventPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editDescription, setEditDescription] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/posts/`);

            const raw = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data.posts)
                    ? res.data.posts
                    : [];

            const formatted = raw.map((post) => ({
                ...post,
                file: post.file
                    ? (post.file.startsWith("http")
                        ? post.file
                        : `${API_BASE}${post.file.startsWith("/") ? "" : "/"}${post.file}`)
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
        if (!window.confirm("Delete this post?")) return;

        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${API_BASE}/api/posts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch {
            alert("Delete failed");
        }
    };

    const handleEditSave = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `${API_BASE}/api/posts/${editingId}/`,
                { description: editDescription },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPosts((prev) =>
                prev.map((p) =>
                    p.id === editingId ? { ...p, description: editDescription } : p
                )
            );

            setEditingId(null);
            setEditDescription("");
        } catch {
            alert("Edit failed");
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

                            {editingId === post.id ? (
                                <textarea
                                    className="border p-2 text-sm rounded"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            ) : (
                                <p className="text-gray-800 text-sm mt-2 break-words line-clamp-4">
                                    {post.description}
                                </p>
                            )}

                            {editingId === post.id ? (
                                <button
                                    onClick={handleEditSave}
                                    className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded text-sm w-fit"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditingId(post.id);
                                        setEditDescription(post.description || "");
                                    }}
                                    className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-1 rounded text-sm w-fit"
                                >
                                    Edit
                                </button>
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
