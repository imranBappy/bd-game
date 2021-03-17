import React, { useEffect, useState } from 'react';
import './signup.css'
import { Typography, Checkbox, InputLabel, Select, FormHelperText, FormControl, Container, Grid, Button, TextField, CssBaseline } from '@material-ui/core';
import { Link } from "react-router-dom";

const SignupFrom = ({ infoFrom, handelSignup }) => {
    const [users, setUser] = useState([])
    const [values, setValue] = infoFrom
    const [clubs, setClub] = useState([])
    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-club')
            .then((response) => response.json())
            .then((json) => {
                json.sort(function (a, b) { return Number(b.balance) - Number(a.balance) });
                setClub(json)
            });
    }, [])

    const countryNames = ['Bangladesh', 'India', 'Country3', 'Country4', 'Country0']

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-users')
            .then((response) => response.json())
            .then((json) => setUser(json));
    }, [])

    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        switch (name) {
            case 'name':
                if (value.length > 1) {
                    setValue({
                        ...values,
                        [name]: value.trim(),
                        ['nameMessage']: '',
                        isValid: true,
                    })
                } else {
                    setValue({
                        ...values,
                        [name]: '',
                        ['nameMessage']: 'Name Must be required',
                        isValid: false,
                    })
                }
                break;
            case 'email':
                if (validateEmail(value)) {
                    setValue({
                        ...values,
                        [name]: value.trim(),
                        ['emailMessage']: '',
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['emailMessage']: 'Please provide your valid email',
                        [name]: '',
                        isValid: false
                    })
                }
                break;
            case 'phone':
                if (value.length > 10) {
                    setValue({
                        ...values,
                        [name]: value.trim(),
                        ['phoneMessage']: '',
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['phoneMessage']: 'Please provide your valid phone number',
                        [name]: '',
                        isValid: false
                    })
                }
                break;
            case 'sUsername':
                if (value) {
                    setValue({
                        ...values,
                        [name]: value.trim(),
                    })
                } else {
                    setValue({
                        ...values,
                        [name]: '',
                    })
                }

                break;
            case 'username':
                let result = users.find(u => u.username === value.toLowerCase().trim())
                if (value) {
                    if (result) {
                        setValue({
                            ...values,
                            ['usernameMessage']: 'User id already exist ! please insert another user id',
                            isValid: false,
                            [name]: ''
                        })
                    } else {
                        setValue({
                            ...values,
                            ['usernameMessage']: '',
                            [name]: value.trim(),
                            isValid: true
                        })
                    }
                } else {
                    setValue({
                        ...values,
                        ['usernameMessage']: 'Username must be required',
                        isValid: false,
                        [name]: ''
                    })
                }

                break;
            case 'password':
                if (value.length > 5) {
                    setValue({
                        ...values,
                        ['passwordMessage']: '',
                        [name]: value.trim(),
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['passwordMessage']: 'Password at least 6 characters.',
                        ['password']: '',
                        isValid: false,
                        [name]: ''
                    })
                }
                break;
            case 'confirmPassword':
                if (values.password === value) {
                    setValue({
                        ...values,
                        ['confirmPasswordMessage']: '',
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['confirmPasswordMessage']: 'Confirm password not match',
                        isValid: false,
                    })
                }

                break;

            default:
                break;
        }

    }
    const handelSelect = e => {
        let name = e.target.name, value = e.target.value
        switch (name) {
            case 'clubId':
                if (value) {
                    setValue({
                        ...values,
                        ['clubMessage']: '',
                        [name]: value,
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['clubMessage']: 'Club must be required',
                        isValid: false
                    })
                }
                break;
            case 'country':
                if (value) {
                    setValue({
                        ...values,
                        ['countryMessage']: '',
                        [name]: value,
                        isValid: true
                    })
                } else {
                    setValue({
                        ...values,
                        ['countryMessage']: 'Country must be required',
                        isValid: false
                    })
                }
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            name="name"
                            onChange={handelChange}
                            error={values.nameMessage ? true : false}
                            helperText={values.nameMessage ? values.nameMessage : ''}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            error={values.emailMessage ? true : false}
                            helperText={values.emailMessage ? values.emailMessage : ''}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            error={values.phoneMessage ? true : false}
                            helperText={values.phoneMessage ? values.phoneMessage : ''}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            error={values.usernameMessage ? true : false}
                            helperText={values.usernameMessage ? values.usernameMessage : ''}
                            onChange={handelChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Sponsor's Username"
                            name="sUsername"
                            onChange={handelChange}
                        />
                        <br />

                        <FormControl required variant="outlined" error={values.clubMessage && true} className='select-club' fullWidth >
                            <InputLabel htmlFor="select-club">Select Club </InputLabel>
                            <Select
                                required
                                native
                                onChange={handelSelect}
                                label="Select Club "
                                inputProps={{
                                    name: 'clubId',
                                    id: 'select-club',
                                }}
                            >
                                <option aria-label="None" />
                                {
                                    clubs.map((club, i) => <option key={i} value={club._id}>{club.name}</option>)
                                }
                            </Select>
                            <FormHelperText>{values.clubMessage && values.clubMessage}</FormHelperText>

                        </FormControl>


                        <FormControl required variant="outlined" error={values.countryMessage && true} className='select-club' fullWidth >
                            <InputLabel htmlFor="select-Country">Select Country</InputLabel>
                            <Select
                                required
                                native
                                onChange={handelSelect}
                                label="Select Country"
                                inputProps={{
                                    name: 'country',
                                    id: 'select-Country',
                                }}
                            >
                                <option aria-label="None" />
                                {
                                    countryNames.map((club, i) => <option key={i} value={club}>{club}</option>)
                                }
                            </Select>
                            <FormHelperText>{values.countryMessage && values.countryMessage}</FormHelperText>
                        </FormControl>


                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handelChange}
                            error={values.passwordMessage ? true : false}
                            helperText={values.passwordMessage ? values.passwordMessage : ''}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            onChange={handelChange}
                            error={values.confirmPasswordMessage ? true : false}
                            helperText={values.confirmPasswordMessage ? values.confirmPasswordMessage : ''}
                        />
                        <p >Your over 18 years old ?</p>
                        <p>
                            <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </p>

                        <Button
                            onClick={handelSignup}
                            className="signup-btn"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign up
                    </Button>
                        <Grid container>
                            <Grid item>
                                <Link className="login-link" to="/login" variant="body2">
                                    {"I have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </Container>
        </>
    );
};

export default SignupFrom

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
