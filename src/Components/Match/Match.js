import React, { useContext, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Button, Typography } from '@material-ui/core';
import BetFrom from '../BetFrom/BetFrom';
import { AuthContext, BetContext } from '../Layout/Layout';
import { useHistory } from 'react-router';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function Match({ game, i, games, bet }) {
    const { country1, _id, country2, name, date, time, isShow, action } = game
    const [expanded, setExpanded] = React.useState('panel1');
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const [auth] = useContext(AuthContext)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [res, setRes] = useState({})
    const [bets, setBet] = useState([])
    const [result, setResult] = useState([])

    useEffect(() => {
        if (bet) {
            setBet(bet)
        }
    }, [])

    return (
        <div>
            {isShow === true && !action === true &&
                <Accordion square expanded={expanded === `panel${1}`} onChange={handleChange(`panel${1}`)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
                        <Typography>{`${name}, ${country1} VS ${country2}, ${date} => ${time} `}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ width: '100%' }}>
                            {bets.map((bit) => <Game auth={auth} history={history} setRes={setRes} open={open} setOpen={setOpen} bet={bit} />)}
                            {bets.map((bit) => <BetFrom res={res} open={open} setOpen={setOpen} bit={bit} />)}
                        </div>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    );
}


const Game = ({ bet, setOpen, setRes, history, auth }) => {
    const handleClickOpen = (e) => {
        if (auth.isLoggedIn) {
            setRes(e)
            setOpen(true);
        } else {
            history.push('/login')
        }
    };

    return (
        <>
            <div className='game-card'>
                <Grid spacing={2} container>
                    <Grid container item>
                        <Typography variant='p' component='h4'>
                            {bet.question} <span className='live'>Live</span>
                        </Typography>
                    </Grid>
                    {bet.ans.map(b => <Grid item>
                        <Button
                            onClick={() => handleClickOpen({ b, bet })}
                            variant="outlined"
                            color="primary">
                            {b.ans} <span className='live'>{b.rate}</span>
                        </Button>
                    </Grid>
                    )}

                </Grid>
            </div>
        </>
    )
}