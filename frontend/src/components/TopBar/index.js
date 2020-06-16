import React from 'react';
import { appTitle } from 'config';
import { ReactComponent as Logo } from 'assets/Logo.svg';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className='top_bar'>
      <Logo className='app_logo' />
      <span className='app_title'>{appTitle}</span>
    </div>
  );
};

export default TopBar;
