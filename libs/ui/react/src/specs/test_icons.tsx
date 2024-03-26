import { render } from '@testing-library/react';
import { IconSparkles } from '../lib/icons';
import '@testing-library/jest-dom';

describe('IconSparkles', () => {
    it('should render the icon', () => {
        const { container } = render(<IconSparkles />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    it('should apply the provided className', () => {
        const { container } = render(<IconSparkles className="custom-class" />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveClass('custom-class');
    });

    it('should pass down other props', () => {
        const { container } = render(<IconSparkles data-testid="sparkles-icon" />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('data-testid', 'sparkles-icon');
    });
});