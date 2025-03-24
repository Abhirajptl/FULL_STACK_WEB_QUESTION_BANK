import './Home.css';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Home = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]); // ✅ Always initialize as an empty array
    const url = import.meta.env.VITE_SERVER_URL; // ✅ Fix environment variable access
    
    const loadPosts = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/getposts`);
            const data = response.data.responseData; // ✅ Extract data safely
            setPosts(Array.isArray(data) ? data : []); // ✅ Ensure it's an array
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]); // ✅ Prevent undefined issues
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    // ✅ Fix: Ensure posts is always an array before filtering
    const filteredPosts = (posts || []).filter((post) =>
        post?.topic?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

    return (
        <div className='Home'>
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <Card key={post._id} post={post} />)
            ) : (
                <p>No matching posts found.</p>
            )}
        </div>
    );
};

export default Home;
