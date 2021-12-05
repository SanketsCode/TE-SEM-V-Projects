import React from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import App from './App';
import Create from './Components/Create/create';
import login from './Components/Login/login';
import SinglePost from './Components/SinglePost/SinglePost';
import UpdatePost from './Components/UpdatePost/updatePost';
import { getUser } from './helper';


const Routes = () => {
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={App}/>
                {
                    getUser() ? <Route path="/create" exact component={Create}/> : <Route path="/create" exact render={() => <Redirect to="/"/>}/>
                }
                <Route path="/login" exact component={login}/>
                <Route path="/post/:slug" exact component={SinglePost} />
                {
                    getUser() ? <Route path="/post/update/:slug" component={UpdatePost} /> : <Route path="/post/update/:slug" render={() => <Redirect to="/"/>} />
                }
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;