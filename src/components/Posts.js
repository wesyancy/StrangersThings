import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => {

  const [searchTerm, setSearchTerm] = useState('');

  function postMatches(post, text) {
    const { title, description, price, location } = post

    if (!searchTerm) return true;

    return post.title.includes(text);
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

      <button>
        <Link to='/posts/create-post'>Add a Post</Link>
      </button>

      <br></br>
      <br></br>

      {
        postsToDisplay.map((post) => {
          const { description, location, price, title, _id, isAuthor } = post;
          return (
            <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
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