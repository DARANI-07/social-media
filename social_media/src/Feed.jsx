import React, { useEffect, useState } from 'react';

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const newPosts = [];
            for (let i = 1; i <= 5; i++) {
                newPosts.push({
                    postId: i,
                    userId: Math.floor(Math.random() * 100), // Random user ID
                    username: `User${Math.floor(Math.random() * 100)}`, // Random username
                    postName: `Post Title ${i}`,
                    imageUrl: `https://picsum.photos/200/200?random=${i}`, // Random image from Picsum
                });
            }
            setPosts(newPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            {posts.map(post => (
                <div key={post.postId} className="post border p-4 rounded w-300px shadow">
                    <img src={post.imageUrl} alt="Post" className="w-200px h-auto rounded" />
                    <h2 className="username font-bold">{post.username}</h2>
                    <p className="postname">{post.postName}</p>
                    <p className="postid">Post ID: {post.postId}</p>
                    <p className="userid">User ID: {post.userId}</p>
                </div>
            ))}
        </div>
    );
}

export default Feed;
