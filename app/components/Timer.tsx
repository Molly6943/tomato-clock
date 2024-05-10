"use client";
import { useState, useEffect } from "react";
import { Flex, Center, Box, Button, Text } from "@chakra-ui/react";
import TimerConfig from "../_config";

// Define initial state and type
interface TimerState {
  minutes: number;
  seconds: number;
  cycle: "Work" | "Break";
  isRunning: boolean;
  cycleCount: number;
}

const getCycleCount: () => number = () => {
  if (typeof window !== "undefined") {
    const cycleCount = window.localStorage.getItem("cycle-count");
    return cycleCount ? parseInt(cycleCount) : 0;
  }
  return 0;
};

const initialState: TimerState = {
  minutes: TimerConfig.workMinutes,
  seconds: 0,
  cycle: "Work",
  isRunning: false,
  cycleCount: 0,
};

const Timer = () => {

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // initial cycle count set from localStorage
    setState(s => ({ ...s, cycleCount: getCycleCount() }));
  }, []);

  useEffect(() => {
    let interval: any = null;

    if (state.isRunning) {
      interval = setInterval(() => {
        const { minutes, seconds, cycle } = state;

        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          const isWorkCycle = cycle === "Work";

          const updatedCycleCount = isWorkCycle
            ? state.cycleCount + 1
            : state.cycleCount;

          setState((s) => ({
            ...s,
            isRunning: true,
            cycle: isWorkCycle ? "Break" : "Work",
            minutes: isWorkCycle
              ? TimerConfig.breakMinutes
              : TimerConfig.workMinutes,
            cycleCount: updatedCycleCount, // increment on end of work cycle
          }));
          if (isWorkCycle) {
            // Only update localStorage after a work cycle
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "cycle-count",
                String(updatedCycleCount)
              );
            }
          }
        } else if (seconds > 0) {
          setState((s) => ({ ...s, seconds: s.seconds - 1 }));
        } else {
          setState((s) => ({ ...s, minutes: s.minutes - 1, seconds: 59 }));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state]);

  const formatTime = (state: TimerState) => {
    return `${state.minutes.toString().padStart(2, "0")}:${state.seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Flex>
      <Center>
        <Box>
          <Text fontSize="1xl" color={state.cycle === "Work" ? "green" : "red"}>
            {state.cycle} Time
          </Text>
          <Text fontSize="1xl">Rounds: {state.cycleCount}</Text>
          <Text fontSize="8xl">{formatTime(state)}</Text>
          <Button
            onClick={() => setState((s) => ({ ...s, isRunning: !s.isRunning }))}
          >
            {state.isRunning ? "Pause" : "Start"}
          </Button>
          <Button ml={4} onClick={() => setState(() => ({...initialState, cycleCount: getCycleCount()}))}>
            Reset
          </Button>
        </Box>
      </Center>
    </Flex>
  );
};

export default Timer;
