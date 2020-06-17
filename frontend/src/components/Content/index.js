import React, { useState, useCallback } from 'react';
import './Content.css';
import TotalPower from 'components/TotalPower';
import Forecast from 'components/Forecast';
import SolarPanels from 'components/SolarPanels';

const Content = () => {
  const [totalPower, setTotalPower] = useState(0);

  const getTotalPower = useCallback((power) => setTotalPower(power), []);

  return (
    <div className='content'>
      <div className='content_info'>
        <TotalPower totalPower={totalPower} />
        <Forecast />
      </div>

      <SolarPanels getTotalPower={getTotalPower} />
    </div>
  );
};

export default Content;
