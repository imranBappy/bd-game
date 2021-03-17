import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";

import { Typography, Container, Avatar, Grid, Checkbox, FormControlLabel, Button, TextField, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext, Header } from '../Layout/Layout';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [auth, setAuth] = useContext(AuthContext)
    let history = useHistory();
    let location = useLocation();
    let [user, setUser] = useState([])
    let [username, setUsername] = useState({
        isUser: false,
        mess: '',
        username: ''
    })

    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-users')
            .then((response) => response.json())
            .then((json) => setUser(json));

    }, [])



    const handleChange = e => {
        let name = e.target.name, value = e.target.value
        if (name === 'username') {
            if (!value.length > 1) {
                setAuth({
                    ...auth,
                    loginValid: false,
                    userMes: 'Please Provide Valid username'
                })
            } else {
                setAuth({
                    loginValid: true,
                    ...auth,
                    username: value.trim(),
                    userMes: ''
                })
            }
        } else if (name === 'password') {
            if (value.length > 5) {
                setAuth({
                    ...auth,
                    loginValid: true,
                    password: value.trim(),
                    passwordMes: ''
                })
            } else {
                setAuth({
                    ...auth,
                    loginValid: false,
                    passwordMes: 'Password at least 6 characters.'
                })
            }
        }

    }

    const handleLogin = () => {
        if (auth.loginValid) {
            let find = user.find(user => user.username === auth.username)
            if (find) {
                setUsername({
                    isUser: true,
                    mess: '',
                    username: find.username
                })
            } else {
                setUsername({
                    isUser: false,
                    mess: 'User not exist!',
                    username: ''
                })
            }

            if (username.isUser) {
                fetch('https://powerful-stream-48655.herokuapp.com/login-user',
                    {
                        method: 'POST',
                        body: JSON.stringify({ username: auth.username, password: auth.password }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((json) => {
                        localStorage.setItem('user', JSON.stringify(json))
                        setAuth(json)
                    });
                history.replace(from);
            }
        }
    }

    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <div className={classes.form}>
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            helperText={username.mess && username.mess}
                            id="username"
                            label="Username"
                            name="username"
                        />
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            helperText={!auth.loginValid && auth.userMes}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />

                        <Button
                            onClick={handleLogin}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                    </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </Container>
        </>
    );
}



function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}