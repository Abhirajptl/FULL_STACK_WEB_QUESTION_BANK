import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreatePost = () => {
  const [heading, setHeading] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const { postID } = useParams();
  const url = import.meta.env.VITE_SERVER_URL;

  const loadPosts = async () => {
    try {
      const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
      const post = response?.data?.responseData;
      if (post) {
        setHeading(post?.topic);
        setQuestion(post?.question);
        setAnswer(post?.answer);
      }
      console.log(post);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (postID) {
      console.log("loadin post...")
      loadPosts();
    }
    // eslint-disable-next-line
  }, [postID])


  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      if (!postID) {
        const response = await axios.post(`${url}/createpost`, {
          topic: heading,
          question,
          answer
        });
        if (response?.data?.responseData) {
          setHeading("");
          setQuestion("");
          setAnswer("");
          navigate('/');
        }
      } else {
        const response = await axios.put(`${url}/updatepost`, {
          postID,
          topic: heading,
          question,
          answer
        });
        if (response?.data?.responseData) {
          setHeading("");
          setQuestion("");
          setAnswer("");
          navigate(`/${postID}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="create-post">
      <h1 className="create-post__title">Create a New Post</h1>
      <form className="create-post__form">
        <div className="create-post__field">
          <label htmlFor="heading" className="create-post__label">Heading:</label>
          <input
            type="text"
            id="heading"
            className="create-post__input"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div className="create-post__field">
          <label htmlFor="question" className="create-post__label">Question:</label>
          <textarea
            id="question"
            className="create-post__textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="create-post__field">
          <label htmlFor="answer" className="create-post__label">Answer:</label>
          <textarea
            id="answer"
            className="create-post__textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button onClick={submitDetails} type="submit" className="create-post__submit">{postID ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default CreatePost;