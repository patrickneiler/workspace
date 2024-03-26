import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../lib/input';
import React from 'react';
import '@testing-library/jest-dom';

describe('Input', () => {
    it('renders an input element', () => {
        render(<Input />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    it('forwards ref to the input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);
        expect(ref.current).toBeInTheDocument();
    });

    it('applies additional attributes to the input element', () => {
        const placeholder = 'Enter your name';
        render(<Input placeholder={placeholder} />);
        const inputElement = screen.getByPlaceholderText(placeholder);
        expect(inputElement).toBeInTheDocument();
    });

});