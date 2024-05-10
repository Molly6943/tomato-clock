import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimerDisplay from './TimerDisplay';
import { describe, expect, test } from '@jest/globals';

describe('TimerDisplay', () => {

    test('it should display the correct time', () => {
        render(<TimerDisplay minutes={2} seconds={30} cycle="Work" cycleCount={1} />);

        expect(screen.getByText('Complete work cycles: 1')).toBeInTheDocument();
        expect(screen.getByText('Work Time')).toBeInTheDocument();
        expect(screen.getByText('02:30')).toBeInTheDocument();
    });

    test('it should correctly format single digit minute and second', () => {
        render(<TimerDisplay minutes={2} seconds={0} cycle="Work" cycleCount={1} />);

        expect(screen.getByText('02:00')).toBeInTheDocument();
    });

});
