import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './currentMatch.css'
import Match from '../Match/Match'
const LiveMatchContainer = () => {
    const [games, setGame] = useState([])
    const [bets, setBets] = useState([])
    const [live, setLive] = useState([])
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
            const result = games.filter(g => g.isLive === true)
            setLive(result)
        }
    }, [games])

    return (
        <div>
            <Container>
                <br />
                <br />
                {
                    live.map((game, i) => {
                        let f = bets.filter(b => b.gameId === game._id)
                        if (f.length > 0) {
                            return <Match bet={f} games={live} game={game} key={i} i={i} />
                        }
                    })
                }
            </Container>
        </div>
    );
};

export default LiveMatchContainer;
