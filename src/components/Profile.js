import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';
// import { getMe } from '../index'

const Profile = ({ user, token, _id, getMe }) => {
  const messages = user.messages;
  const posts = user.posts;
  const userID = user._id;

  getMe();

  const profunction = (token, _id ) => {
    
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
  
                  <div 
                    id='notecard'
                    key={post._id}>
                    <p>Title: {title}</p>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    <p>Will Deliver: {willDeliver}</p>
                    <Link to={`/posts/${post._id}`}><button>View Post</button></Link>
                    <Link to={`/posts/edit-post/${post._id}`}><button>Edit Post</button></Link>
                    <button 
                      id='delete'
                      onClick={() => {
                      deletePost(token, post._id)
                    }}>Delete Post</button>
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
  
                  <div 
                    id='notecard'
                    key={message._id}>
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
  
                  <div 
                    id='notecard' 
                    key={message._id}>
                    <p>Item: {title}</p>
                    <p>Message: {message.content}</p>
                  </div>
  
                )
              }
            })
          }
        </div>
  
      </div>
    )
  }

  useEffect(() => {
  
  }, [user])

  return profunction(token, _id) 

}

export default Profile;