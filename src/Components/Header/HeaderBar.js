import React, { useContext } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Clock from 'react-live-clock';
import 'moment-timezone';
import { UserInfoContext } from '../Layout/Layout';

const HeaderBar = ({ auth, user }) => {
    var d = new Date();
    let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
    const [userInfo] = useContext(UserInfoContext)
    return (
        <>
            <div style={{ height: '30px', background: 'black', marginRight: '-20px' }}>
                <div className="my-container">
                    <Grid container>
                        <Grid item xs={4} md={4}>
                            <Typography color="primary">
                                <Clock format={'HH:mm:ss'} ticking={true} />
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box textAlign="center">
                                {auth.isLoggedIn && <Typography color="primary">
                                    Balance - {userInfo.balance && userInfo.balance}
                                </Typography>}
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4} >
                            <Typography style={{ textAlign: 'right' }} color="primary">
                                {date}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default HeaderBar;