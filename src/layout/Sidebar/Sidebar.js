import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarConfig } from './Sidebar.config';
import Navigation from 'components/Navigation/Navigation';
import styles from './Sidebar.module.scss'

const Sidebar = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
        <div className={styles.logo}>
          HomeFunds
          </div>
        </NavLink>
        <div className={styles.nav_container}>
          <Navigation config={sidebarConfig}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
