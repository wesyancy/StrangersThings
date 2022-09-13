import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';

const Profile = ({ user, token, _id }) => {
  const messages = user.messages;
  const posts = user.posts;
  const userID = user._id;

  useEffect(() => {
    console.log('refresh');
    
  }, [user, deletePost])

  console.log(user)

  return (
    <div>

      <div>
        <h1>Your Posts</h1>
        {
          posts && posts.map(post => {
            // const fromUserID = posts.fromUser._id
            // const {username} = posts.fromUser;
            const title = post.title;
            const price = post.price;
            const description = post.description;
            const location = post.location;
            const willDeliver = post.willDeliver;

            if (post.active === true) {
              return (

                <div key={post._id}>
                  <p>Title: {title}</p>
                  <p>Description: {description}</p>
                  <p>Price: {price}</p>
                  <p>Location: {location}</p>
                  <p>Will Deliver: {willDeliver}</p>
                  <button><Link to={`/posts/${_id}`}>View</Link></button>
                  <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                  <button onClick={() => {
                    deletePost(token, post._id)
                    console.log('hello')
                  }}>Delete this post?</button>
                </div>

              )
            }
          })
        }
      </div>

      <div>
        <h1>Messages Received</h1>
        {
          messages && messages.map(message => {

            const fromUserID = message.fromUser._id;
            const { username } = message.fromUser;
            const { title } = message.post;

            if (userID !== fromUserID) {
              return (

                <div key={message._id}>
                  <p>From User: {username} </p>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </div>

              )
            }
          })
        }

      </div>

      <div>
        <h1>Messages Sent</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const { username } = message.fromUser;
            const { title } = message.post;

            if (userID === fromUserID) {
              return (
                <div key={message._id}>
                  <p>From User: {username} </p>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </div>
              )
            }
          })
        }
      </div>

    </div>
  )
}

export default Profile;