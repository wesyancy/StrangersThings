import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts, token }) => {

  const [searchTerm, setSearchTerm] = useState('');

  function postMatches(post, text) {

    const { title , description , price } = post
  
    if (!searchTerm) return true;

    return (
      post.title.toLowerCase().includes(text) ||
      post.description.toLowerCase().includes(text) ||
      post.price.toLowerCase().includes(text)
    )
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  useEffect(() => {
    
  }, [searchTerm])

  useEffect(() => {
    // force repaint
  }, [posts])

  return (


    <div id='outer div element'>
      
      <input
        id='searchBar'
        type='text'
        placeholder='search'
        onChange={(ev) => setSearchTerm(ev.target.value)}
      />

      <br></br>

      { token ? 
        (
            <Link to='/posts/create-post'><button id='postItemButton'>Post an Item</button></Link>
          
        ) 
        : 
        (
          <h3>Login to post an item</h3>
        )
      }

      {
        postsToDisplay.map((post) => {
          const { description, location, price, title, _id, isAuthor, willDeliver } = post;
          return (
            <div id='notecard' key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              <p>Will Deliver: {willDeliver ? 'Yes': 'No'}</p>
              {
                isAuthor ? (
                  <>
                    <Link to={`/posts/${_id}`}><button>View</button></Link>
                    
                  </>
                ) : (
                  <Link to={`/posts/${_id}`}><button>View</button></Link>
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