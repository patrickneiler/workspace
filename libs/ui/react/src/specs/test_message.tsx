import { render } from '@testing-library/react';
import {
    UserMessage,
    BotMessage,
    BotCard,
    SystemMessage,
    FunctionCard,
    SpinnerMessage,
} from '../lib/message';
import '@testing-library/jest-dom';

describe('UserMessage', () => {
    it('should render the user message component', () => {
        const { getByText } = render(<UserMessage>Hello, user!</UserMessage>);
        expect(getByText('Hello, user!')).toBeInTheDocument();
    });
});

describe('BotMessage', () => {
    it('should render the bot message component', () => {
        const { getByText } = render(<BotMessage>Hello, bot!</BotMessage>);
        expect(getByText('Hello, bot!')).toBeInTheDocument();
    });
});

describe('BotCard', () => {
    it('should render the bot card component', () => {
        const { getByText } = render(<BotCard>Hello, bot card!</BotCard>);
        expect(getByText('Hello, bot card!')).toBeInTheDocument();
    });
});

describe('SystemMessage', () => {
    it('should render the system message component', () => {
        const { getByText } = render(<SystemMessage>Hello, system!</SystemMessage>);
        expect(getByText('Hello, system!')).toBeInTheDocument();
    });
});

describe('FunctionCard', () => {
    it('should render the function card component', () => {
        const { getByText } = render(<FunctionCard>Hello, function card!</FunctionCard>);
        expect(getByText('Hello, function card!')).toBeInTheDocument();
    });
});

describe('SpinnerMessage', () => {
    it('should render the spinner message component', () => {
        const { getByText } = render(<SpinnerMessage>Hello, spinner!</SpinnerMessage>);
        expect(getByText('Hello, spinner!')).toBeInTheDocument();
    });
});