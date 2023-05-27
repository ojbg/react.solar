import React from 'react';
import { render, screen } from '@testing-library/react';
import Forecast from 'components/Forecast';
import { Forecast as constants } from 'constants/Forecast';

describe('Forecast component', () => {
  test('render component without errors', () => {
    render(<Forecast />);
  });

  test('display card header', () => {
    const expected = constants.title;
    render(<Forecast />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
