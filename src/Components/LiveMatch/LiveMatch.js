import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Container, Fab, CircularProgress, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function LiveMath({ name }) {
    const classes = useStyles();
    const success = false;
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        color: 'white'
    });

    return (
        <>
            <Container>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Fab
                            aria-label="save"
                            className={buttonClassname}
                        >
                        </Fab>
                        <CircularProgress size={68} className={classes.fabProgress} />
                    </div>
                    <div className={classes.wrapper}>
                        <a style={{ textDecoration: 'none' }} href="/">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={buttonClassname}
                            >
                                {name} Match
                            </Button>
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}
