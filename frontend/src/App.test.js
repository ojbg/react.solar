import React from 'react';
import { render, waitForElement} from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('render component without errors', async()=> {
        await waitForElement(()=>render(<App />));
    });
});