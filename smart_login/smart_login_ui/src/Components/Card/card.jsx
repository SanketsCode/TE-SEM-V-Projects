import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser, fetchPosts } from '../../helper';
import './card.scss';
const Card = ({ user, i, title, content, slug,imgUrl,DeletePost}) => {
  return (
    <div
      key={i} className="card">
     {
       imgUrl ?  <img className="img" src={imgUrl} placeholder="img" /> : <img className="img" src="https://tripurapolice.gov.in/sepahijala/media/779/download/photo-1103595_960_720.png" placeholder="img" />
     }

      <h5 className="card-title">Title - {title.substring(0,20)}...</h5>
      <p className="card-text">{content.substring(0, 30)}...</p>
      <h5 className="card-author">Author - {user}</h5>

      <Link to={`/post/${slug}`} className="btn btn-see btn-primary">See Details...</Link>
      {
        getUser() ? <div className="mt-2">
          <Link to={`/post/update/${slug}`}>
            <button className="btn btn-sm btn-outline-warning m-1">Update</button>
          </Link>
          <button className="btn btn-sm btn-outline-danger m-1"
            onClick={() => DeletePost(slug)}
          >Delete</button>
        </div> : <h6></h6>
      }





    </div>
  );
}

export default Card;

