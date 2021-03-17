import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CssBaseline, Container, Button, FormControl, Typography, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { AuthContext } from '../Layout/Layout';
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
const Deposit = ({ open }) => {
    const classes = useStyles();
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <DepositRequest />
            </main>
        </>
    );
};

export default Deposit;

const DepositRequest = () => {
    const classes = useStyles();
    const [auth] = useContext(AuthContext)
    const history = useHistory()
    const date = new Date()
    const [deposit, setDeposit] = useState({
        username: auth.username,
        status: false,
        action: false,
        date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
    })
    const handleChange = (e) => {
        let name = e.target.name, value = e.target.value
        setDeposit({
            ...deposit,
            [name]: value
        })
    }


    const submitDeposit = () => {
        fetch('https://powerful-stream-48655.herokuapp.com/user-deposit', {
            method: 'POST',
            body: JSON.stringify(deposit),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        history.push('/')

    }
    const clubnames = ['Bkash', 'Rocket', 'Nagad']

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Deposit Request
                </Typography>
                <div className={classes.form}>
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="To"
                        name="to"
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="From"
                        name="by"
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
                                clubnames.map((club, i) => <option key={i} value={club}>{club}</option>)
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
                        onClick={submitDeposit}
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
