import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api/config";

const API_BASE = API_BASE_URL.replace(/\/$/, "");

const ManageEventPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts
    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/posts/`);
            setPosts(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load posts:", error);
            setPosts([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Delete post (admin only)
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await axios.delete(`${API_BASE}/api/posts/${id}/`);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete post. Only admin can delete.");
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
                                        <img
                                            src={post.file}
                                            alt="Uploaded"
                                            className="max-h-60 w-auto object-contain rounded"
                                        />
                                    )}
                                </div>
                            )}
                            {post.description && (
                                <p className="text-gray-800 text-sm mt-2 break-words line-clamp-4">
                                    {post.description}
                                </p>
                            )}
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded text-sm w-fit"
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
