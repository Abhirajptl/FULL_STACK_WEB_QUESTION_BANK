import './SinglePost.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [isEditing, setIsEditing] = useState(false);  // Track if editing
    const [editedPost, setEditedPost] = useState({});  // Store edited data
    const { postID } = useParams();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_SERVER_URL;

    // Load post details
    const loadPosts = async () => {
        try {
            const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
            setPost(response?.data?.responseData);
            setEditedPost(response?.data?.responseData);  // Set initial edit data
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    // Update post in database
    const updatePost = async () => {
        try {
            const response = await axios.put(`${url}/updatepost`, {
                postID,
                topic: editedPost.topic,
                question: editedPost.question,
                answer: editedPost.answer
            });

            if (response.data.success) {
                alert("Post Updated Successfully!");
                setPost(editedPost);  // Update UI with new data
                setIsEditing(false);  // Exit edit mode
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        }
    };

    // Delete post function
    const deletePost = async () => {
        try {
            await axios.delete(`${url}/deletepost`, { data: { postID } });
            navigate('/'); // Redirect to home after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='Single-Post'>
            {isEditing ? (
                // Editable Inputs
                <>
                    <input type="text" name="topic" value={editedPost.topic} onChange={handleChange} className="input-field"/>
                    <input type="text" name="question" value={editedPost.question} onChange={handleChange} className="input-field"/>
                    <textarea name="answer" value={editedPost.answer} onChange={handleChange} className="textarea-field"/>
                    <div className='btns'>
                        <button onClick={updatePost} className='btn btn-save'>Save</button>
                        <button onClick={() => setIsEditing(false)} className='btn btn-cancel'>Cancel</button>
                    </div>
                </>
            ) : (
                // Display Normal Post View
                <>
                    <h1 className='topic'>{post?.topic}</h1>
                    <h2 className='question'>{post?.question}</h2>
                    <p className='answer'>{post?.answer}</p>
                    <div className='btns'>
                        <button onClick={deletePost} className='btn btn-delete'>Delete</button>
                        <button onClick={() => setIsEditing(true)} className='btn btn-update'>Update</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SinglePost;

