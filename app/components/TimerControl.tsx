import { Button } from "@chakra-ui/react";

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControl: React.FC<TimerControlsProps> = ({
  isRunning,
  onStartPause,
  onReset,
}) => {
  return (
    <>
      <Button onClick={onStartPause}>{isRunning ? "Pause" : "Start"}</Button>
      <Button ml={4} onClick={onReset}>
        Reset
      </Button>
    </>
  );
};

export default TimerControl
