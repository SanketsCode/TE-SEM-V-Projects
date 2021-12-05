import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUser, logOut } from '../../helper';
import './nav.scss';


const Nav = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <a className="navbar-brand" >SMART POST</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {
                            getUser() ? <li className="nav-item">
                                <a className="nav-link" href="/create">Create</a>
                            </li> : <li></li>
                        }
                        {/* <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {
                                    !getUser() ?
                                        <li><Link to="/login" className="dropdown-item" href="#">Login</Link></li>
                                        : <li><div to="/login" className="dropdown-item" onClick={
                                            () => logOut(() => history.push('/'))
                                        }>Log Out</div></li>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Nav);

