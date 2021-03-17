import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../style'
import BetsHistoryTable from '../BetsHistoryTable/BetsHistoryTable';
import betListBat from '../../fakeData/betListBar';
import { BetContext } from '../Layout/Layout';
const useStyles = makeStyles((theme) => (styles(theme)));

const BetHistory = ({ open }) => {
    const classes = useStyles();
    const [bets, setBets] = useContext(BetContext)
    // const [bets, setBets] 

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div>
                    <h1>Bet History</h1>
                    <BetsHistoryTable columns={betListBat()} rows={bets} />
                </div>
            </main>
        </>
    );
};

export default BetHistory;
