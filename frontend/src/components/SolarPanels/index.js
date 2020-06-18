import React, { useState, useEffect } from 'react';
import './SolarPanels.css';
import Card from 'components/Card';
import Api from 'services/ApiPanels';
import { SolarPanels as constants } from 'constants/SolarPanels';

const SolarPanels = ({ getTotalPower }) => {
  const title = constants.title;
  const [panels, setPanels] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {  
    async function update() {
      setPanels([]);

      try {
        setIsError(false);
        const { panels, totalPower } = await Api.getPanelsInfo();
        setPanels(panels);
        getTotalPower(totalPower);
      } catch (error) {
        setIsError(true);
      }
    }

    update();
    const interval = setInterval(() => {
      update();
    }, constants.panelsTimer);
    return () => clearInterval(interval);
  }, [getTotalPower]);

  return (
    <div className='solar_panels'>
      <div className='text_bold'>
        <span>{title}</span>
        {isError && (
          <span className='error'>{constants.messages.apiError}</span>
        )}
      </div>

      <SolarMonitor panels={panels} />

      <div className='solar_panels_group'>
        {panels.map((panel) => {
          return (
            <SolarPanel
              key={panel.id}
              status={panel.status}
              name={`${panel.name}${panel.id}`}
              voltage={panel.voltage}
              power={panel.power}
            />
          );
        })}
      </div>
    </div>
  );
};

const SolarPanel = ({ status, name, voltage, power }) => {
  return (
    <div className='solar_panel'>
      <span className={status} />
      <span className='panel_data'>
        <span className='text_bold'>{name}</span>
        <span>{voltage}</span>
        <span>{power}</span>
      </span>
    </div>
  );
};

const SolarMonitor = ({ panels }) => {
  const status = constants.status;
  
  function getTotalStatus(status) {
    return panels.filter((panel) => panel.status === status).length;
  }

  return (
    <Card>
      <div className='monitor'>
        {status.map((item, index) => {
          return (
            <div key={index} className='monitor_panel'>
              <span className={item} />
              <span>{item.toUpperCase()}</span>
              <span>{getTotalStatus(item)}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SolarPanels;
