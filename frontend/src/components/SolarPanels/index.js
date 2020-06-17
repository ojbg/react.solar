import React, { useState, useEffect } from 'react';
import './SolarPanels.css';
import config from 'config';

const SolarPanels = ({ getTotalPower }) => {
  const title = 'SOLAR PANELS';
  const [panels, setPanels] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const MAX_PANELS = config.maxPanels;

    // Mock server API to get solar panels data
    function getStatus() {
      const status = ['available', 'service', 'unavailable', 'fault'];

      const rnd = Math.random();

      if (rnd >= 0.3) {
        return status[0];
      }

      if (rnd < 0.3 && rnd >= 0.2) {
        return status[1];
      }

      if (rnd < 0.2 && rnd >= 0.1) {
        return status[2];
      }

      return status[3];
    }

    async function getPanels() {
      const panels = [];
      let totalPower = 0;

      for (let i = 0; i < MAX_PANELS; i++) {
        let voltage = 0;
        let current = 0;
        let power = 0;
        const status = getStatus();
        const MAX_VOLTAGE = 48;
        const MAX_CURRENT = 10;
        const DECIMALS = 2;

        if (status !== 'available') {
          voltage = 0;
          current = 0;
          power = 0;
        } else {
          voltage = Number((Math.random() * MAX_VOLTAGE).toFixed(DECIMALS));
          current = Number((Math.random() * MAX_CURRENT).toFixed(DECIMALS));
          power = Number((voltage * current).toFixed(DECIMALS));
        }

        const newPanel = {
          id: i + 1,
          name: 'P',
          voltage: `${voltage} v`,
          power: `${power} W`,
          status,
        };
        panels.push(newPanel);
        totalPower += power;
      }

      return { panels, totalPower };
    }
    //

    async function update() {
      setPanels([]);

      try {
        setIsError(false);
        const { panels, totalPower } = await getPanels();
        setPanels(panels);
        getTotalPower(totalPower);
      } catch (error) {
        setIsError(true);
      }
    }

    update();
    const interval = setInterval(() => {
      update();
    }, config.panelsTimer);
    return () => clearInterval(interval);
  }, [getTotalPower]);

  return (
    <div className='solar_panels'>
      <div className='text_bold'>
        <span>{title}</span>
        {isError && <span className='error'>API Error</span>}
      </div>

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

export default SolarPanels;
