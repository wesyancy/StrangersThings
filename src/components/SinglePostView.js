import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMessage } from '../api';

const SendMessage = ({ postID, token }) => {
  const [message, setMessage] = useState({ content: '' });

  const navigate = useNavigate();
  // we need 3 things to make this request
  // Post-id, token, message object containing the content of the message

  async function addMessage() {
    await createMessage({ postID, message, token })
    navigate(`/profile`)
  }

  return (
    <form onSubmit={(ev) => {
      ev.preventDefault();
      addMessage();
    }}>


      <div>
        <input
          type='text'
          placeholder='Enter Message'
          onChange={(ev) => setMessage({ content: ev.target.value })}
        />
        <button type='submit'>Send Message</button>
      </div>

    </form>
  )
}

const SinglePostView = ({ posts, token }) => {

  const [activateMessage, setActivateMessage] = useState(false);

  const { postID } = useParams();

  const [currentPost] = posts.filter(post => post._id === postID);

  const { title, description, location, price, willDeliver, isAuthor } = currentPost;

  return (
    <div>
      <div>
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Location: {location}</p>
        <p>Will Deliver: {willDeliver}</p>
      </div>
      {token && !isAuthor ?
        (
          <button onClick={() => setActivateMessage(!activateMessage)}>Message this user</button>
        )
        :
        (
          null
        )
      }
      {
        activateMessage && <SendMessage postID={postID} token={token} />
      }
    </div>
  )
}

export default SinglePostView;