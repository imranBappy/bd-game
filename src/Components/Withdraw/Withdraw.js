import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CssBaseline, Container, Button, FormControl, Typography, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { UserInfoContext } from '../Layout/Layout'
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
const Withdraw = ({ open }) => {
    const classes = useStyles();
    const [userInfo] = useContext(UserInfoContext)
    const date = new Date()
    const history = useHistory()
    const [withdraw, setWithdraw] = useState({
        username: userInfo.username,
        status: false,
        action: false,
        date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
    })

    const withdrawRequest = () => {
        fetch('https://powerful-stream-48655.herokuapp.com/add-withdraw-request', {
            method: 'POST',
            body: JSON.stringify(withdraw),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        history.push('/')
    }
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <WithdrawRequest withdrawRequest={withdrawRequest} withdraw={withdraw} setWithdraw={setWithdraw} />
            </main>
        </>
    );
};

export default Withdraw;

const WithdrawRequest = ({ setWithdraw, withdraw, withdrawRequest }) => {
    const classes = useStyles();

    const handleChange = (e) => {
        let name = e.target.name, value = e.target.value
        setWithdraw({
            ...withdraw,
            [name]: value
        })
    }

    const methodName = ['Bkash', 'Rocket', 'Nagad']

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Withdraw Request
                </Typography>
                <div className={classes.form}>
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="To"
                        name="phone"
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="amount"
                        label="Amount"
                        id="amount"
                    />

                    <FormControl required variant="outlined" className='select-club' fullWidth >
                        <InputLabel htmlFor="select-method">Select Method </InputLabel>
                        <Select
                            required
                            native
                            onChange={handleChange}
                            label="select-method "
                            inputProps={{
                                name: 'method',
                                id: 'select-method',
                            }}
                        >
                            <option aria-label="None" />
                            {
                                methodName.map((club, i) => <option key={i} value={club}>{club}</option>)
                            }
                        </Select>
                    </FormControl>
                    <FormControl required variant="outlined" className='select-club' fullWidth >
                        <InputLabel htmlFor="select-type">Select Type </InputLabel>
                        <Select
                            required
                            native
                            onChange={handleChange}
                            label="select-type "
                            inputProps={{
                                name: 'type',
                                id: 'select-type',
                            }}
                        >
                            <option aria-label="None" />
                            <option value='Personal'>Personal</option>
                            <option value='Agent'>Agent</option>

                        </Select>
                    </FormControl>

                    <Button
                        onClick={withdrawRequest}
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
