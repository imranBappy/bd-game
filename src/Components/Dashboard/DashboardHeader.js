import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Avatar, Typography, CssBaseline, AppBar, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },

}));
const DashboardHeader = ({ open, handleDrawer }) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to='/'>
                        <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                    </Link>
                </Toolbar>
            </AppBar>

        </>
    );
};

export default DashboardHeader;