import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = ({ token, fetchPosts, navigate }) => {
  
  const [ogTitle, setNewTitle] = useState('');
  const [ogDescription, setNewDesc] = useState('');
  const [ogLocation, setNewLocation] = useState('');
  const [ogPrice, setNewPrice] = useState('');
  const [ogwillDeliver, setNewWillDeliver] = useState(null);
  
  async function addPost() {
    const newPost = {
      title: ogTitle,
      description: ogDescription,
      price: ogPrice,
      location: ogLocation,
      willDeliver: ogwillDeliver
    }

    
    
    await createPost(token, newPost)
    await fetchPosts();
    navigate(`/posts`)
  }
  
  return (
    <form onSubmit={ (ev) => {
      ev.preventDefault();
      addPost();
      
    }}>
      <input 
        type='text'
        placeholder='title'
        onChange={(ev) => setNewTitle(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='description'
        onChange={(ev) => setNewDesc(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='location'
        onChange={(ev) => setNewLocation(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='price'
        onChange={(ev) => setNewPrice(ev.target.value)}
      />
      <p>Will Deliver?</p>
      <input 
        type='checkbox'
        checked={ogwillDeliver}
        onChange={(ev) => setNewWillDeliver(ev.target.checked)}
      />
      <button type='submit'>Post</button>
    </form>
  )
}

export default CreatePost;