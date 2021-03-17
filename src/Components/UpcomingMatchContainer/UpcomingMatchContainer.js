import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Match from '../Match/Match';

const UpcomingMatchContainer = ({ }) => {
    const [games, setGame] = useState([])
    const [bets, setBets] = useState([])
    const [upcoming, setUpcoming] = useState([])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/game-get')
            .then((response) => response.json())
            .then((json) => setGame(json))
    }, [])

    useEffect(() => {
        fetch(`https://powerful-stream-48655.herokuapp.com/bet-gets`)
            .then((response) => response.json())
            .then((json) => setBets(json));
    }, [])

    useEffect(() => {
        if (games.length > 0) {
            const result = games.filter(g => !g.isLive === true)
            setUpcoming(result)
        }
    }, [games])

    return (
        <>
            <Container>
                <br />
                {
                    upcoming.map((game, i) => {
                        let f = bets.filter(b => b.gameId === game._id)
                        if (f.length > 0) {
                            return <Match bet={f} games={upcoming} game={game} key={i} i={i} />
                        }
                    })
                }
            </Container>
        </>
    );
};

export default UpcomingMatchContainer;