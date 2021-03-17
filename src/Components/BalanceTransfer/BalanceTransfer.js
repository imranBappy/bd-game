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

const BalanceTransfer = ({ open }) => {
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

                <BalanceTransferFrom history={history} />
            </main>
        </>
    );
};



const BalanceTransferFrom = ({ history }) => {
    const classes = useStyles();
    const [amount, setAmount] = useState({
        username: '',
        amount: 0
    })
    const [userInfo] = useContext(UserInfoContext)
    const handleChange = (e) => {
        let name = e.target.name, value = e.target.value
        setAmount({
            ...amount,
            [name]: value
        })
    }
    const handelSubmit = () => {
        if (userInfo.balance > amount.amount) {
            fetch(`https://powerful-stream-48655.herokuapp.com/user-single?username=${amount.username}`)
                .then((response) => response.json()).then(json => {
                    const addUser = {
                        ...json,
                        balance: Number(json.balance) + Number(amount.amount)
                    }
                    const minutesUser = {
                        ...userInfo,
                        balance: Number(userInfo.balance) - Number(amount.amount)
                    }
                    fetch(`https://powerful-stream-48655.herokuapp.com/user-update`, {
                        method: 'PATCH',
                        body: JSON.stringify(addUser),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    fetch(`https://powerful-stream-48655.herokuapp.com/user-update`, {
                        method: 'PATCH',
                        body: JSON.stringify(minutesUser),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                })
            history.push('/dashboard')
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    BalanceTransfer
                </Typography>
                <div className={classes.form}>
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="amount"
                        label="Amount"
                    />

                    <Button
                        onClick={handelSubmit}
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

export default BalanceTransfer;