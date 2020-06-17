import React from 'react';
import './Panel.css';

const Panel = ({ title, footer, children }) => {
  return (
    <div className='panel'>
      <div className='text_bold'>{title}</div>
      <div>{children}</div>
      <div className='panel_footer'>{footer}</div>
    </div>
  );
};

export default Panel;
