"use client";
import { useState, useEffect, useRef } from "react";
import { Stack, Center, Box } from "@chakra-ui/react";
import TimerConfig from "../_config";
import { TimerSound } from "../_types";
import TimerControl from "./TimerControl";
import TimerDisplay from "./TimerDisplay";

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

const initialTimerSound: TimerSound = {
  name: "Kitchen",
  file: "/kitchen_timer.mp3",
  label: "Kitchen Timer",
}

const Timer = () => {
  const [state, setState] = useState(initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // initial cycle count set from localStorage
    setState((s) => ({ ...s, cycleCount: getCycleCount() }));
  }, []);

  useEffect(() => {
    const audioVolume = 70
    if (audioRef.current) {
      audioRef.current.volume = audioVolume / 100;
    }
  }, []);

  useEffect(() => {
    let interval: any = null;

    if (state.isRunning) {
      interval = setInterval(async () => {
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
            if (audioRef.current) {
              await audioRef.current.play();
            }
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

  const onStartPause = () => {
    setState((s) => ({ ...s, isRunning: !s.isRunning }))
  }

  const onReset = () => {
    setState(() => ({
      ...initialState,
      cycleCount: getCycleCount(),
    }))
  }

  return (
    <>
    <Center h="100vh">
      <Box w="100%" maxW="600px">
        <Stack spacing={4} direction="column" alignItems="center">
          <TimerDisplay {...state} />
          <Box display="flex" justifyContent="center" alignItems="center">
            <TimerControl isRunning={state.isRunning}  onStartPause={onStartPause} onReset={onReset}  />
          </Box>
        </Stack>
      </Box>
    </Center>
    {initialTimerSound.file && (
      <audio ref={audioRef} src={initialTimerSound.file} crossOrigin="anonymous" />
    )}
    </>
  );
};

export default Timer;
