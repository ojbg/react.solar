import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalPower from 'components/TotalPower';

describe('TotalPower component', () => {
    test('render component without errors', ()=> {
        render(<TotalPower />);        
    });

    test('display card header', () => {
        const expected = 'TOTAL POWER';
        render (<TotalPower />);
        expect(screen.getByText(expected)).toBeInTheDocument();
    });

    test('displays formated power value when prop is passed', async() => {
        const totalPower = 1780;
        const expected = '1.78 KW';
        render( <TotalPower totalPower={totalPower} />);
        expect(await screen.findByText(expected)).toBeInTheDocument();
    });

    test('displays Not Valid text when invalid prop', async() => {
        const invalidProp = 'text';
        const expected = 'Not Valid';
        render( <TotalPower totalPower={invalidProp} />);
        expect(await screen.findByText(expected)).toBeInTheDocument();        
    });

    test('displays default previous power value', async() => {
        const totalPower = 1500;
        const expected = 'Previous: 0.00 W';
        render (<TotalPower totalPower={totalPower}/>);
        expect(await screen.findByText(expected)).toBeInTheDocument();
    });

    test('displays previous power value', async() => {
        const totalPower = 1e6;
        const totalPowerNext = 2000;
        const expected = 'Previous: 1.00 MW';
        const {rerender} = render (<TotalPower totalPower={totalPower}/>);
        rerender (<TotalPower totalPower={totalPowerNext}/>);
        expect(await screen.findByText(expected)).toBeInTheDocument();
    });
});
