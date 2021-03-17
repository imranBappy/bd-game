import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, ListItem, ListItemIcon, ListItemText, IconButton, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom'
import { AuthContext, UserInfoContext } from '../Layout/Layout';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}));

export default function DashboardNav({ handleDrawer, open }) {
    const classes = useStyles();
    const theme = useTheme();
    const [auth] = useContext(AuthContext)
    const [userInfo] = useContext(UserInfoContext)
    console.log(userInfo);
    return (
        < >
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <h2 style={{ margin: ' 0 auto' }}>{auth.name && auth.name}</h2>

                    <IconButton onClick={handleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Profile', 'Deposit', 'Withdraw', 'Bets-history', 'club-holder', 'balance-transfer', 'ChangePassword'].map((text, i) => (
                        <Link key={i} style={{ textDecoration: 'none' }} to={`/dashboard/${text.toLocaleLowerCase()}`}>
                            <ListItem button >
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>

                    ))}

                </List>
                <Divider />

            </Drawer>

        </>
    );
}
