import { render, fireEvent, screen } from '@testing-library/react';
import TimerControl from './TimerControl';
import '@testing-library/jest-dom/extend-expect';
import { describe, expect, test } from '@jest/globals';

describe('TimerControl', () => {
    let onStartPause: jest.Mock;
    let onReset: jest.Mock;

    // Initialize the props before each test
    beforeEach(() => {
        onStartPause = jest.fn();
        onReset = jest.fn();
    });

    test('it should display the correct button text when isRunning is true or false', () => {
        const { rerender } = render(<TimerControl isRunning={false} onStartPause={onStartPause} onReset={onReset} />);

        expect(screen.getByText('Start')).toBeInTheDocument();

        rerender(<TimerControl isRunning={true} onStartPause={onStartPause} onReset={onReset} />);

        expect(screen.getByText('Pause')).toBeInTheDocument();
    });

    test('it should call the correct function when each button is clicked', () => {
        render(<TimerControl isRunning={true} onStartPause={onStartPause} onReset={onReset} />);
        fireEvent.click(screen.getByText('Pause'));

        expect(onStartPause).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Reset'));

        expect(onReset).toHaveBeenCalled();
    });
});
