import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({config}) => {
  return (
    <nav>
      <ul>
        {config.map((item, index)=>
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.title}
            </NavLink>
          </li>)}
      </ul>
    </nav>
  )
}

export default Navigation;
