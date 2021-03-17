import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, Header } from '../Layout/Layout';
import './signup.css'
import SignupFrom from './SignupFrom';

const Signup = () => {
    const [values, setValue] = useState({
        isValid: false
    })
    let history = useHistory()
    let { isValid, name, sUsername, email, username, password, phone, clubId, country } = values
    const [auth, setAuth] = useContext(AuthContext)
    const handelSignup = () => {
        let isMyValid = myCheck({ name, email, username, password, phone, clubId, country })
        if (isValid === true && isMyValid === true) {
            setAuth({
                ...auth,
                sUsername,
                name,
                isActive: true,
                balance: 0,
                email, username, password, phone, clubId, country
            })
            fetch('https://powerful-stream-48655.herokuapp.com/register', {
                method: 'POST',
                body: JSON.stringify(auth),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            fetch(`https://powerful-stream-48655.herokuapp.com/single-club/${auth.clubId}`)
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
            history.push('/login')
        }
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
    let isMyValid = false;
    let { name, email, username, password, phone, clubId, country } = information
    if (name) { isMyValid = true } else { return false }
    if (email) { isMyValid = true } else { return false }
    if (username) { isMyValid = true } else { return false }
    if (password) { isMyValid = true } else { return false }
    if (phone) { isMyValid = true } else { return false }
    if (clubId) { isMyValid = true } else { return false }
    if (country) { isMyValid = true } else { return false }
    return isMyValid
}
