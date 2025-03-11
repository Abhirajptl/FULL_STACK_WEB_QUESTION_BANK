import './Home.css';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Home = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const url = import.meta.env.VITE_SERVER_URL;
    
    const loadPosts = async () => {
        try {
            const response = await axios.get(`${url}/getposts`);
            setPosts(response.data.responseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    // **Filter posts based on searchQuery**
    const filteredPosts = posts.filter((post) =>
        post.topic.toLowerCase().includes(searchQuery.toLowerCase())
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

