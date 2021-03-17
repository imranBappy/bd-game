import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../style'
import { BetContext, UserInfoContext } from '../Layout/Layout';
import ClubHolderList from './ClubHolderList';
import ClubHolderDate from '../../fakeData/ClubHolder'
import { Button, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => (styles(theme)));

const ClubHolder = ({ open }) => {
    const [club, setClub] = useState([])
    const [users, setUser] = useState([])
    const [userInfo] = useContext(UserInfoContext)
    const [clubUser, setClubUser] = useState({
        isLoggedIn: false,
        password: ''
    })
    const [newClub, setNewClub] = useState([])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-club')
            .then((response) => response.json())
            .then(json => setClub(json))
    }, [])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/get-users')
            .then((response) => response.json())
            .then(json => setUser(json))
    }, [])

    const classes = useStyles();
    const [bets, setBets] = useContext(BetContext)
    const handelChange = e => {
        let name = e.target.name, value = e.target.value
        setClubUser({
            ...clubUser,
            [name]: value
        })
    }

    const handelLogin = () => {
        const myClub = club.find(c => c.username === userInfo.username)
        if (myClub.password === clubUser.password) {
            console.log(myClub);
            const filter = users.filter(u => u.clubId === myClub._id)
            setNewClub(filter)
            // setClubUser({
            //     ...clubUser,
            //     isLoggedIn: true
            // })
        }

    }



    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

                <div>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} >

                            <TextField
                                onChange={handelChange}
                                name='password'
                                label="Password"
                                fullWidth
                            />

                            <Button
                                onClick={handelLogin}
                                style={{ marginTop: 10 }}
                                fullWidth
                                variant="contained"
                                color='primary'>
                                Login
                        </Button>
                        </Grid>

                    </Grid>
                    <h1 style={{ textAlign: 'center' }}>Club Holder</h1>

                    <ClubHolderList columns={ClubHolderDate()} rows={newClub} />
                </div>
            </main>
        </>
    );
};

export default ClubHolder;
