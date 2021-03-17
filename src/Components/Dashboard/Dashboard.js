import React from 'react';
import DashboardNav from './DashboardNav'
import DashboardHeader from './DashboardHeader';
import Profile from '../Profile/Profile';
import MainDashboard from './MainDashboard'
import Deposit from '../Deposit/Deposit';
import Withdraw from '../Withdraw/Withdraw';
import ChangePassword from '../ChangePassword/ChangePassword';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import BetHistory from '../BetHistory/BetHistory';
import BalanceTransfer from '../BalanceTransfer/BalanceTransfer';
import ClubHolderTable from '../ClubHolder/ClubHolderList';
import ClubHolder from '../ClubHolder/ClubHolder';

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const handleDrawer = () => setOpen(!open);
    return (
        <div style={{ display: 'flex', marginTop: '80px' }}>
            <DashboardHeader
                handleDrawer={handleDrawer}
                open={open}
            />
            <DashboardNav
                handleDrawer={handleDrawer}
                open={open}
            />
            <PrivateRoute exact path="/dashboard">
                <MainDashboard open={open} />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard/dashboard">
                <MainDashboard open={open} />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard/profile">
                <Profile open={open} />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard/deposit">
                <Deposit open={open} />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard/withdraw">
                <Withdraw open={open} />
            </PrivateRoute>

            <PrivateRoute exact path="/dashboard/balance-transfer">
                <BalanceTransfer open={open} />
            </PrivateRoute>

            <PrivateRoute exact path="/dashboard/club-holder">
                <ClubHolder open={open} />
            </PrivateRoute>

            <PrivateRoute exact path="/dashboard/changepassword">
                <ChangePassword open={open} />
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard/Bets-history">
                <BetHistory open={open} />
            </PrivateRoute>

        </div>
    );
}

