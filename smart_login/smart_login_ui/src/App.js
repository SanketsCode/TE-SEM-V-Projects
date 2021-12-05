// import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Components/nav/nav';
import Card from './Components/Card/card';
import { getToken } from './helper';

const App = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API}/post`)
      .then(response => {
        // console.log(response);
        setPosts(response.data);
      })
      .catch(err => {
        console.log(err);
        alert("Error Fetching Post");
      })
  }

  useEffect(() => {
    fetchPosts();
  },[])

  const  DeletePost = (slug) => {
    let ans = window.confirm("Are You Shure For Delete Operation?")
    if (ans) {
      axios.delete(`${process.env.REACT_APP_API}/post/${slug}`,{
        headers: {
            authorization:`Bearer ${getToken()}`
        }
    })
        .then(response => {
          //show success alert
          alert(`Post Deleted`);
          fetchPosts();

        })
        .catch(err => {
          console.log(err.response);
          alert(err.response.data.error);
        })
    }
  }

  return (
    <div className="MainPage holder container pb-5 pt-3">
      <Nav />
      <hr />
      <h1>Latest Posts</h1>
      <br></br>
      <div className="homepage">
          <div className="cards-container">
          {
        posts.map((post, i) => {
          // console.log(post);
          return <Card title={post.title} i={i} content={post.content} slug={post.slug} user={post.user} imgUrl={post.imgUrl} DeletePost={DeletePost} />
        }
        )
      }
          </div>
      </div>
    </div>
  );
}

export default App;

