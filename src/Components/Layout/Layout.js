import React, { createContext, useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SignIn from '../SignIn/SignIn';
import Signup from '../Signup/Signup';
export const AuthContext = createContext()
export const UserContext = createContext()
export const BetContext = createContext()
export const UserInfoContext = createContext()

const Layout = ({ children }) => {
    // let getUser = JSON.parse(localStorage.getItem('admin')) || { isLoggedIn: false }
    const [auth, setAuth] = useState({ isLoggedIn: false })
    const [userInfo, setUserInfo] = useState({})
    const [user, setUser] = useState({
        username: '',
        balance: 0,
        totalDeposit: 0,
        totalWithdraw: 0,
    })
    const [bets, setBete] = useState([])

    const [mainBet, setMainBet] = useState([])
    const [betId, setBetId] = useState([])

    useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem('user'))
        let result = Object.keys(getUser)
        if (result > 0) {
            setAuth({ ...getUser, isLoggedIn: true })
        } else {
            setAuth({ ...getUser, isLoggedIn: false })
        }
    }, [])


    useEffect(() => {
        if (auth._id) {
            fetch(`https://powerful-stream-48655.herokuapp.com/single-user/${auth._id}`)
                .then((response) => response.json())
                .then(json => {
                    setAuth({ ...json, isLoggedIn: true })
                    setUserInfo(json)
                })
        }
    }, [auth._id])

    const [bet, setBet] = useState({})

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/filter-bets/${userInfo._id}`)
            .then((response) => response.json())
            .then((json) => {
                setBete(json)
            });
    }, [])
    useEffect(() => {
        let x = []
        if (bets.length > 0) {
            for (let i = 0; i < bets.length; i++) {
                const id = bets[i].betId;
                x.push(id)
            }
        }
        setBetId(x)
    }, [bets])

    useEffect(() => {
        if (betId.length > 0) {
            fetch(`https://powerful-stream-48655.herokuapp.com/multiple-get`, {
                method: 'POST',
                body: JSON.stringify(betId),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                });
        }
    }, [betId])


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            <UserContext.Provider value={[user, setUser]}>
                <UserContext.Provider value={[bet, setBet]}>
                    <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
                        <BetContext.Provider value={[bets, setBet]}>
                            {children}
                            <Footer />
                        </BetContext.Provider>
                    </UserInfoContext.Provider>
                </UserContext.Provider>
            </UserContext.Provider>
        </AuthContext.Provider>
    );
};

export default Layout;
export { Header, Home, SignIn, NotFound, Signup, Dashboard, PrivateRoute }