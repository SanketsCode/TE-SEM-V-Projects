import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../nav/nav';
import './SinglePost.scss';

const SinglePost = (props) => {
  const [post, setPost] = useState('');

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.log(err);
        alert('Error Loading single post');
      });
  })
  return (
    <div className="container pb-5 pt-3">
      <Nav />
      <hr />
      <div className="Single-card">
          <h5 className="card-title">{post.title}</h5>
          {

            post.imgUrl ? <img className="img" src={post.imgUrl} /> : <img src="https://tripurapolice.gov.in/sepahijala/media/779/download/photo-1103595_960_720.png" className="img" />
          }
          <p className="card-text">{post.content}...</p>
          <p className="card-text">Created At - {new Date(post.createdAt).toLocaleString()}...</p>
        </div>
      </div>
  );
}

export default SinglePost;