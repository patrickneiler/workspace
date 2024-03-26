import { render } from '@testing-library/react';
import { Separator } from '../lib/separator';
import '@testing-library/jest-dom';

describe('Separator', () => {
    it('renders a horizontal separator by default', () => {
        const { container } = render(<Separator />);
        const separator = container.firstChild;

        expect(separator).toBeInTheDocument()

    });
});