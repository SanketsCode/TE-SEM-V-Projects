import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { authenticate, getUser } from '../../helper';
import Nav from '../nav/nav';


const Login = (props) => {
    //state for Login
    const [state,setState] = useState({
        name:'',
        password:''
    });

    const {name,password} = state;

    useEffect(() => {
        getUser() && props.history.push('/');
    },[])

    const handleChange = (name) => (event) => {
        setState({...state,[name]:event.target.value});
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{name,password})
        .then(res => {
            authenticate(res,() => {
                return props.history.push('/')
            })

        })
        .catch(err => {
            console.log(err.response);
            alert(err.response.data.error);
        }); 
        
    }

    return ( 
        <div className="container p-5 pt-3">
        <Nav/>
        <hr/>
        <h1>Login</h1>
        <br/>
        <form onSubmit={HandleSubmit}>
            <div className="form-group mb-3">
                <label className="form-label">
                    Username
                </label>
                <input value={name} 
                onChange={handleChange('name')}
                type="text" className="form-control"
                placeholder="Username"
                required
                /> 
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    Password
                </label>
                <input 
                onChange={handleChange('password')}
                value={password} type="password" className="form-control"
                placeholder="Password"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                 Login
            </button>
        </form>
    </div>
     );
}
 
export default withRouter(Login);