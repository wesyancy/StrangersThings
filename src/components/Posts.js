import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts, token }) => {

  const [searchTerm, setSearchTerm] = useState('');

  function postMatches(post, text) {
  
    if (!searchTerm.toLowerCase()) return true;

    return (
      post.title.toLowerCase().includes(text) ||
      post.description.toLowerCase().includes(text) ||
      post.price.toLowerCase().includes(text) ||
      post.location.toLowerCase().includes(text)
    )
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  useEffect(() => {
    // force repaint
  }, [searchTerm])

  useEffect(() => {
    // force repaint
  }, [posts])

  return (


    <div id='outer div element'>

      <br></br>
      <br></br>

      <input
        type='text'
        placeholder='search'
        onChange={(ev) => setSearchTerm(ev.target.value)}
      />

      <br></br>
      <br></br>

      {
        token ? 
        (
          <button>
            <Link to='/posts/create-post'>Add a Post</Link>
          </button>
        ) : (
          <h3>Login to post an item</h3>
        )
      }

      <br></br>
      <br></br>

      {
        postsToDisplay.map((post) => {
          const { description, location, price, title, _id, isAuthor, willDeliver } = post;
          return (
            <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              <p>Will Deliver: {willDeliver ? 'Yes': 'No'}</p>
              {
                isAuthor ? (
                  <>
                    <button><Link to={`/posts/${_id}`}>View</Link></button>
                    <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                  </>
                ) : (
                  <button><Link to={`/posts/${_id}`}>View</Link></button>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts;