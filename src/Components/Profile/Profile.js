import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AuthContext } from '../Layout/Layout';
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
}));


const Profile = ({ open }) => {
    const classes = useStyles();
    const [auth] = useContext(AuthContext)
    const [club, setClub] = useState({})
    const { name, username, clubId, phone, email } = auth
    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/single-club/${clubId}`)
            .then((response) => response.json())
            .then((json) => setClub(json));
    })

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid spacing={1} container >
                    <Grid item xs={6} spacing={1}>
                        <p>Name: </p>
                        <p>Username: </p>
                        <p>Club: </p>
                        <p>Phone: </p>
                        <p>Email: </p>
                    </Grid>
                    <Grid item xs={6} spacing={1}>
                        <p>{name}</p>
                        <p>{username}</p>
                        <p>{club.name}</p>
                        <p>{phone}</p>
                        <p>{email}</p>
                    </Grid>
                </Grid>
            </main>
        </>
    );
};

export default Profile;