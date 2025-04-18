import Sidebar from 'layout/Sidebar/Sidebar';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './Layout.module.scss'
import Overview from 'pages/Overview/Overview';
import Transactions from 'pages/Transactions/Transactions';
import BalanceSheet from 'pages/BalanceSheet/BalanceSheet';
import Income from 'pages/Income/Income';
import RecurringBills from 'pages/RecurringBills/RecurringBills';
import Pots from 'pages/Pots/Pots';
import MonthSelector from 'pages/MonthSelector/MonthSelector';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.layout_content}>
        <Routes>
          <Route path="/month-selector" element={<MonthSelector />}></Route>
          <Route path="/overview" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
          <Route path="/income" element={<Income />} />
          <Route path="/recurring-bills" element={<RecurringBills />} />
          <Route path="/pots" element={<Pots />} />
          <Route path="*" element={<Navigate to="/month-selector" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout;
