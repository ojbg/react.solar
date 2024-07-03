// Mock server API to get solar panels data
import { SolarPanels as constants } from 'constants/SolarPanels';

export async function getPanelsInfo() {
  const status = constants.status;
  function getStatus() {
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

  function getPanels() {
    const panels = [];
    let totalPower = 0;

    for (let i = 0; i < constants.maxPanels; i++) {
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

  return getPanels();
}
