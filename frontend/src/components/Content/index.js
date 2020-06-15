import React from 'react';
import TotalPower from 'components/TotalPower';
import Forecast from 'components/Forecast';
import SolarPanels from 'components/SolarPanels';

const Content = () => {
  return (
    <div>
      <TotalPower />
      <Forecast />
      <SolarPanels />
    </div>
  );
};

export default Content;
