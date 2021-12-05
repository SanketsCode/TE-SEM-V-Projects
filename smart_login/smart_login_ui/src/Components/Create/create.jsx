import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../nav/nav';
import { getToken } from '../../helper';
const Create = () => {
    const [state,setState] = useState({
        title:'',
        content:'',
        user:'',
        imgUrl:''
    });

    //Destructure value
    const {title,content,user,imgUrl} = state;

    //Handle Change fucntion
    const handleChange = (name) => (event) => {
        return setState({...state,[name]:event.target.value});
    }

    // Handle submit
    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/post`,{title,content,user,imgUrl},{
            headers: {
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response);
            //empty the state
            setState({...state,title:'',content:'',user:'',imgUrl:''});
            //show success alert
            alert(`Post Created ${response.data.title}`);

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
            <h1>CREATE POST</h1>
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
                    placeholder="Image Link"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Post
                </button>
            </form>
        </div>
     );
}
 
export default Create;