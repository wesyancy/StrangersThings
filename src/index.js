import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import {
  Navbar,
  Posts,
  Profile,
  Home,
  Register,
  Login,
  CreatePost,
  SinglePostView,
  EditPost
} from './components';

import {
  getPosts,
  getUserDetails
} from './api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

  async function fetchPosts() {
    const results = await getPosts(token)
    setPosts(results.data.posts);
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

  useEffect(() => {
    fetchPosts();
  }, [token])

  useEffect(() => {
    getMe();
  }, [token])

  return (
    <div id="navbar">
      <h1>Stranger's Things</h1>
      <Navbar logout={logout} token={token} user={user} />
      <Routes >
        <Route
          path='/'
          element={<Home
            token={token} />}
        />
        <Route
          path='/posts'
          element={<Posts
            posts={posts}
            token={token}
          />}
        />
        <Route
          exact path='/posts/create-post'
          element={<CreatePost
            token={token}
            fetchPosts={fetchPosts}
            navigate={navigate}
            user={user}
            setUser={setUser}
          />}
        />
        <Route
          exact path='/posts/edit-post/:postID'
          element={<EditPost
            posts={posts}
            token={token}
          />}
        />
        <Route
          path='/posts/:postID'
          element={<SinglePostView
            posts={posts}
            token={token}
            user={user}
            navigate={navigate}
            setUser={setUser}
            getMe={getMe}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route
          path='/profile'
          element={<Profile
            getMe={getMe}
            setUser={setUser}
            user={user}
            setToken={setToken}
            token={token}
            fetchPosts={fetchPosts}
          />}
        />
        <Route
          path='/register'
          element={<Register
            setToken={setToken}
            token={token}
            navigate={navigate}
          />}
        />
        <Route
          path='/login'
          element={<Login
            setToken={setToken}
            navigate={navigate}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />}
        />
      </Routes>
    </div>
  )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);