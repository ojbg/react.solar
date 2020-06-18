import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import SolarPanels from 'components/SolarPanels';
import { SolarPanels as constants } from 'constants/SolarPanels';

describe('SolarPanels component', () => {
  test('render component without errors', async () => {
    await waitForElement(() => render(<SolarPanels />));
  });

  test('display component title', async() => {
    const expected = constants.title;    
    render(<SolarPanels getTotalPower />);
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  test('callback function from parent is called', async () => {
    const getTotalPowerMock = jest.fn();
    await waitForElement(() =>
      render(<SolarPanels getTotalPower={getTotalPowerMock} />)
    );
    expect(getTotalPowerMock).toHaveBeenCalled();
  });

  test('callback function from parent is called once', async () => {
    const getTotalPowerMock = jest.fn();
    await waitForElement(() =>
      render(<SolarPanels getTotalPower={getTotalPowerMock} />)
    );
    expect(getTotalPowerMock).toHaveBeenCalledTimes(1);
  });

  test('callback function from parent returns succesfully', async () => {
    const getTotalPowerMock = jest.fn();
    await waitForElement(() =>
      render(<SolarPanels getTotalPower={getTotalPowerMock} />)
    );
    expect(getTotalPowerMock).toHaveReturned();
  });
});
