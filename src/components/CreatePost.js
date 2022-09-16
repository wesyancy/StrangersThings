import React, { useState } from 'react';
import { createPost, getUserDetails } from '../api';

const CreatePost = ({ token, navigate, setUser }) => {
  
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

    async function getMe() {
      const storedToken = window.localStorage.getItem('token');
  
      if (!token) {
        if (storedToken) {
          setToken(storedToken);
        }
        return;
      }
  
      const results = await getUserDetails(token)
      if (results.success) {
        setUser(results.data);
      } else {
        console.log(results.error.message);
      }
    }
    
    await createPost(token, newPost)

    navigate(`/profile`)
  }
  
  return (
    <form 
      id='notecard'
      onSubmit={ (ev) => {
      ev.preventDefault();
      addPost();
      
    }}>
      <input 
        id='createTitle'
        type='text'
        placeholder='Title'
        onChange={(ev) => setNewTitle(ev.target.value)}
      />
      <br></br>
      <input 
        id='createDescription'
        type='text'
        placeholder='Description'
        onChange={(ev) => setNewDesc(ev.target.value)}
      />
      <br></br>
      <input 
        id='createLocation'
        type='text'
        placeholder='Location'
        onChange={(ev) => setNewLocation(ev.target.value)}
      />
      <input 
        id='createPrice'
        type='number'
        placeholder='Price'
        onChange={(ev) => setNewPrice(ev.target.value)}
      />
      <p>Check the box if you offer delivery</p>
      <input 
        id='createWD'
        type='checkbox'
        checked={ogwillDeliver}
        onChange={(ev) => setNewWillDeliver(ev.target.checked)}
      />
      <br></br>
      <button type='submit'>Create Post</button>
    </form>
  )
}

export default CreatePost;