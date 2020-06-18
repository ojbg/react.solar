import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import Content from 'components/Content';

describe('Content component', () => {
  test('render component without errors', async () => {
    await waitForElement(() => render(<Content />));
  });
});
