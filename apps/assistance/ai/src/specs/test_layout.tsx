import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RootLayout from '../app/layout';

describe('RootLayout', () => {
    it('should render children successfully', () => {
        const { getByText } = render(
            <RootLayout>
                <div>Test Child</div>
            </RootLayout>
        );
        expect(getByText('Test Child')).toBeInTheDocument()
    });

    it('should have the correct HTML attributes', () => {
        const { container } = render(<RootLayout><></></RootLayout>);
        const htmlElement = container.querySelector('html');
        const bodyElement = container.querySelector('body');

        expect(htmlElement).toHaveAttribute('lang', 'en');
        expect(bodyElement).toHaveClass('font-sans antialiased');
    });
});