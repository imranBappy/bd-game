import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CssBaseline, Container, Button, FormControl, Typography, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { UserInfoContext } from '../Layout/Layout';
import { useHistory } from 'react-router';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
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

const ChangePassword = ({ open }) => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <ChangePasswordFrom history={history} />
            </main>
        </>
    );
};



const ChangePasswordFrom = ({ history }) => {
    const classes = useStyles();
    const [password, setPassword] = useState({
        currentPassword: '',

    })
    const [userInfo] = useContext(UserInfoContext)
    const handleChange = (e) => {
        let name = e.target.name, value = e.target.value
        setPassword({
            ...password,
            [name]: value
        })
    }
    const ChangePassword = () => {
        if (password.currentPassword === userInfo.password) {
            if (password.newPassword === password.confirmPassword) {
                fetch(`https://powerful-stream-48655.herokuapp.com/user-update`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        ...userInfo, password: password.newPassword
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                history.push('/dashboard')
            }
        }
    }



    const methodName = ['Bkash', 'Rocket', 'Nagad']

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <div className={classes.form}>
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="currentPassword"
                        label="Current Password"
                        name="currentPassword"
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        id="newPassword"
                    />

                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirm-password"
                    />
                    <Button
                        onClick={ChangePassword}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default ChangePassword;