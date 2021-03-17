import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, UserContext } from '../Layout/Layout';
import './header.css'
import HeaderBar from './HeaderBar';
import logo from '../../img/logo.png'

export default function Header() {
    const [auth, setAuth] = useContext(AuthContext);
    const [user] = useContext(UserContext);

    const myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    const logoutHandler = () => {
        setAuth({ isLoggedIn: false });
        localStorage.setItem('user', JSON.stringify({ isLoggedIn: false }))
    }
    return (
        <>
            <HeaderBar auth={auth} user={user} />
            <div className="topnav" id="myTopnav">
                <div className="my-container">
                    <Link className="logo" to="/">
                        <img className="logo-img" src={logo} alt="logo" />
                    </Link>
                    <div className="right-header">
                        <Link style={{ display: 'none' }} to="/"></Link>
                        {auth.isLoggedIn ?
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link onClick={logoutHandler} to="/">Logout</Link>
                            </> :
                            <Link to="/login">Login</Link>
                        }
                    </div>
                    <a href="javascript:void(0);" style={{ fontSize: '17px' }} className="icon" onClick={myFunction}>&#9776;</a>
                </div>
            </div>
            <>
                {auth.isLoggedIn ? '' :
                    <div className='btn-container' >
                        <button className="btn1">
                            <Link to="/signup">Register Now</Link>
                        </button>
                        <button className="btn2">
                            <Link to="/login">Sign In</Link>
                        </button>
                    </div>
                }
            </>
        </>
    );
}
