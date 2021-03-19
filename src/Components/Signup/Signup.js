import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AllUsersContext, AuthContext, Header } from '../Layout/Layout';
import './signup.css'
import SignupFrom from './SignupFrom';

const Signup = () => {
    const [users, setUsers] = useContext(AllUsersContext)
    const [values, setValue] = useState({
        isValid: false
    })
    let history = useHistory()
    let { isValid, name, sUsername, email, username, password, phone, clubId, country } = values
    const [auth, setAuth] = useContext(AuthContext)
    const handelSignup = () => {
        let isMyValid = myCheck({ name, email, username, password, phone, clubId, country })
        if (isValid === true && isMyValid === true) {
            let newAuth = {
                ...auth,
                sUsername: sUsername ? sUsername : '',
                name,
                isActive: true,
                balance: 0,
                email, username, password, phone, clubId, country
            }
            setAuth(newAuth)
            isSubmitted(newAuth)
        }
    }
    function isSubmitted(isAuth) {

        fetch('https://powerful-stream-48655.herokuapp.com/register', {
            method: 'POST',
            body: JSON.stringify(isAuth),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        fetch(`https://powerful-stream-48655.herokuapp.com/single-club/${isAuth.clubId}`)
            .then((response) => response.json())
            .then((json) => {
                fetch('https://powerful-stream-48655.herokuapp.com/club-edit-active', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        ...json,
                        members: Number(json.members) + 1
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            });

        setUsers([...users, isAuth])
        history.push('/login')
    }

    return (
        <>
            <Header />
            <SignupFrom
                infoFrom={[values, setValue]}
                handelSignup={handelSignup}
            />
        </>
    );
};

export default Signup;

function myCheck(information) {
    let isMyValid = true;
    let { name, email, username, password, phone, clubId, country } = information
    if (name) { } else { return false }
    if (email) { } else { return false }
    if (username) { } else { return false }
    if (password) { } else { return false }
    if (phone) { } else { return false }
    if (clubId) { } else { return false }
    if (country) { } else { return false }
    return isMyValid
}
