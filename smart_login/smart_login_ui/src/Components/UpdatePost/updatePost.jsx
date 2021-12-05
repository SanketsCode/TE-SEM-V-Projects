import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../helper';
import Nav from '../nav/nav';


const UpdatePost = (props) => {
    const [state,setState] = useState({
        title:'',
        user:'',
        content:'',
        imgUrl:''
    });

    const {title,content,user,imgUrl} = state;


    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
        .then(res => {
            const {title,content,user,imgUrl} = res.data;
            setState({...state,title,content,user,imgUrl});
        })
        .catch(err => {
            console.log(err);
            alert('Error Loading single post');
        });
    },[]);

    const handleChange = (name) => (event) => {
        setState({...state,[name]:event.target.value});
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`,{title,content,user},{
            headers: {
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response);
            //empty the state
            // setState({...state,title:'',content:'',user:''});
            //show success alert
            alert(`Post Updated ${response.data.title}`);

        })
        .catch(err => {
            console.log(err.response);
            alert(err.response.data.error);
        })
    }


    return (
        
        <div className="container p-5 pt-3">
        <Nav/>
        <hr/>
        <h1>UPDATE POST</h1>
        <br/>
        <form onSubmit={HandleSubmit}>
            <div className="form-group mb-3">
                <label className="form-label">
                    Title
                </label>
                <input value={title} 
                onChange={handleChange('title')}
                type="text" className="form-control"
                placeholder="Post title"
                required
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    Content
                </label>
                <textarea 
                onChange={handleChange('content')}
                value={content} type="text" className="form-control"
                placeholder="Write Something....."
                required></textarea>
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    User
                </label>
                <input 
                onChange={handleChange('user')}
                value={user} type="text" className="form-control"
                placeholder="Your Name"
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    IMAGE Link
                </label>
                <input 
                onChange={handleChange('imgUrl')}
                value={imgUrl} type="text" className="form-control"
                placeholder="Your Name"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                 UPDATE
            </button>
        </form>
    </div>
     );
}
 
export default UpdatePost;