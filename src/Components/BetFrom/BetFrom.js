import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Grid } from '@material-ui/core';
import { AuthContext, UserInfoContext } from '../Layout/Layout';
export default function BetFrom({ open, setOpen, res }) {
    const [betTaka, setBetTaka] = useState(100)
    const [userInfo, setUserInfo] = useContext(UserInfoContext)
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('https://powerful-stream-48655.herokuapp.com/game-get')
            .then((response) => response.json())
            .then((json) => setGames(json))
    }, [])

    const [betCheck, setBetCheck] = useState({
        isValid: true,
    })
    const handleClose = () => {
        setOpen(false);
    };
    const handelChange = e => {
        let value = Number(e.target.value)
        if (value > userInfo.balance) {
            setBetCheck({ ...betCheck, isValid: false })
        } else {
            setBetCheck({ ...betCheck, isValid: true })
        }
        if (value) {
            if (betTaka > -1) {
                setBetTaka(value)
            }
        }
    }
    let question = res.bet && res.bet.question || ''
    let ans = res.b && res.b.ans || ''
    let rate = res.b && res.b.rate || ''
    const date = new Date()

    const handelSubmit = () => {

        const game = games.find(g => g._id === res.bet.gameId)
        if (betCheck.isValid) {
            const newAns = {
                gameName: `${game.name} - ${game.country1} VS ${game.country2}`,
                betId: res.bet._id,
                ansId: res.b._id,
                rate: res.b.rate,
                question: res.bet.question,
                ans: res.b.ans,
                amount: betTaka,
                userId: userInfo._id,
                username: userInfo.username,
                isLoss: false,
                isWin: false,
                gameReturn: false,
                date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
            }

            fetch(`https://powerful-stream-48655.herokuapp.com/ans-add`, {
                method: 'POST',
                body: JSON.stringify(newAns),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            let updateUser = {
                ...userInfo,
                balance: Number(userInfo.balance) - Number(betTaka)
            }
            fetch(`https://powerful-stream-48655.herokuapp.com/user-update`, {
                method: 'PATCH',
                body: JSON.stringify(updateUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setUserInfo(updateUser)
            setOpen(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ paddingBottom: '0px' }} id="form-dialog-title"> {question}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>{ans} {rate}</p>
                        <Grid container>
                            <Grid item md={10} xs={10}>
                                <p> Total Stake</p>
                                <p> Possible Winning</p>
                            </Grid>
                            <Grid item md={2} xs={2}>
                                <div style={{ textAlign: 'right' }}>
                                    <p > {betTaka}</p>
                                    <p> {Number(betTaka) * Number(rate)}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                    <TextField
                        error={betCheck.isValid ? false : true}
                        onChange={handelChange}
                        value={betTaka}
                        defaultValue='100'
                        margin="dense"
                        name='bit'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handelSubmit} color="primary">
                        Place Bet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
