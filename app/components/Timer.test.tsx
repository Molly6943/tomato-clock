import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';
import { test, jest } from '@jest/globals';
import expect from 'expect';

// Mock the localStorage functionality
(global as any).localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

jest.useFakeTimers();

test('it should start and pause the timer', async () => {
    render(<Timer />);

    // Start the timer
    act(() => {
        userEvent.click(screen.getByText('Start'));
        jest.advanceTimersByTime(1000);
    });

    // Verify the button now shows "Pause"
    expect(await screen.findByText('Pause')).toBeInTheDocument();

    // Pause the timer
    act(() => {
        userEvent.click(screen.getByText('Pause'));
    });

    // Verify the button now shows "Start"
    expect(await screen.findByText('Start')).toBeInTheDocument();
});

test('it should reset the timer', async () => {
    render(<Timer />);

    // Start the Timer
    act(() => {
        userEvent.click(screen.getByText('Start'));
        jest.advanceTimersByTime(1000);
    });

    // Verify the button now shows "Pause"
    expect(await screen.findByText('Pause')).toBeInTheDocument();

    // Reset the timer
    act(() => {
        userEvent.click(screen.getByText('Reset'));
    });

    // Verify the button now shows "Start" and we are in "Work Time"
    expect(await screen.findByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Work Time')).toBeInTheDocument();
});

// test('it should automatically switch to break after work ends', async () => {
//     // Speed up the time to make transition happen in testing environment.
//     jest.useFakeTimers('modern');

//     render(<Timer />);

//     expect(await screen.findByText('Work Time')).toBeInTheDocument();

//     act(() => {
//         // Start the timer
//         userEvent.click(screen.getByText('Start'));
//     });

//     act(() => {
//         // Advance timers by the work time set in TimerConfig for workMinute + 1s
//         jest.advanceTimersByTime((TimerConfig.workMinutes * 60 + 1) * 1000);
//     });

//     // Check for 'Break Time'
//     expect(await screen.findByText('Break')).toBeInTheDocument();

//     jest.useRealTimers();
// });

// test('it should count the correct number of completed cycles', async () => {
//     // Speed up the timer to transition quickly
//     jest.useFakeTimers('modern');

//     render(<Timer />);

//     // Execute 3 complete cycles
//     for (let i = 1; i <= 3; i++) {
//         // Start the timer
//         act(() => {
//             userEvent.click(screen.getByText('Start'));
//         });

//         // Advance timer to complete "work" cycle plus 1s
//         act(() => {
//             jest.advanceTimersByTime((TimerConfig.workMinutes * 60 + 1) * 1000);
//         });

//         // Assert "Break" state and reset
//         expect(await screen.findByText('Break')).toBeInTheDocument();
//         act(() => {
//             userEvent.click(screen.getByText('Reset'));
//         });

//         // Advance timer to complete "break" cycle plus 1s
//         act(() => {
//             jest.advanceTimersByTime((TimerConfig.breakMinutes * 60 + 1) * 1000);
//         });

//         // Expect incremented cycle count
//         expect(screen.getByText(`Complete work cycles: ${i}`)).toBeInTheDocument();
//     }

//     jest.useRealTimers();
// });
