import React, { useEffect, useState } from 'react';
import HeadNews from '../HeadNews/HeadNews';
import { Header } from '../Layout/Layout';
import LiveMatch from '../LiveMatch/LiveMatch';
import UpcomingMatchContainer from '../UpcomingMatchContainer/UpcomingMatchContainer';
import LiveMatchContainer from '../CurrentMatch/LiveMatchContainer';

const Home = () => {

    return (
        <>
            <Header />
            <HeadNews />
            <LiveMatch name='Live' />
            <LiveMatchContainer /> <br /><br />
            <LiveMatch name='Upcoming' />
            <UpcomingMatchContainer />
        </>
    );
};

export default Home;