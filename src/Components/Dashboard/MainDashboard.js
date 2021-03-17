import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Chart from '../Chart/Chart';
import { AuthContext, UserInfoContext } from '../Layout/Layout';

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

const MainDashboard = ({ open }) => {
    const classes = useStyles();

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <TotalCart />
            </main>
        </>
    );
};

export default MainDashboard;

function TotalCart() {
    const [userInfo] = useContext(UserInfoContext)
    return (
        <>
            <Grid spacing={5} container direction="row" justify="center" alignItems="center" >
                <Grid item md={5} spacing={3}>
                    <Card>
                        <CardContent>
                            <Box my={1}>
                                <Typography component='span'>
                                    <MonetizationOnIcon />
                                </Typography>
                                <Typography style={{ margin: 10, fontWeight: 'bold' }} variant="h6" component="span">
                                    Total Balance
                                    </Typography>
                            </Box>
                            <Box my={5}>
                                <Typography style={{ fontSize: 60, fontWeight: 'bold' }} align="center" variant="h4" component="h4">
                                    {userInfo.balance}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}