import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, MuiAccordion, Button, Typography, MuiAccordionDetails, MuiAccordionSummary } from '@material-ui/core';
import FitFrom from '../FitFrom/FitFrom';

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

export default function CustomizedAccordions({ game, i }) {
    const [expanded, setExpanded] = React.useState('panel1');
    const [open, setOpen] = useState(false)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div>
            <Accordion square expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
                    <Typography>{game.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '100%' }}>
                        {game.allBit.map((bit) => <Game open={open} setOpen={setOpen} bit={bit} />)}
                        <FitFrom open={open} setOpen={setOpen} />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


const Game = ({ bit, setOpen }) => {
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <div style={{ width: '100%' }}>
                <div className='game-card'>
                    <Grid spacing={2} container>
                        <Grid container item>
                            <Typography variant='p' component='h4'>
                                {bit.question} <span className='live'>Live</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleClickOpen} variant="outlined" color="secondary">
                                {bit.name1} <span className='live'>{bit.rate1} </span>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleClickOpen} variant="outlined" color="primary">
                                {bit.name2} <span className='live'>{bit.rate2}</span>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}