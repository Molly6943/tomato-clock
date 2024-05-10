import { Box, Text } from "@chakra-ui/react";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  cycle: "Work" | "Break";
  cycleCount: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  minutes,
  seconds,
  cycle,
  cycleCount,
}) => {
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Box display="flex" justifyContent="end" alignItems="end">
        <Text fontSize="1xl">Complete work cycles.: {cycleCount}</Text>
      </Box>
      <Text fontWeight={600} fontSize="4xl">
        {cycle} Time
      </Text>
      <Text fontSize="8xl" color="white">
        {formatTime(minutes, seconds)}
      </Text>
    </>
  );
};

export default TimerDisplay;
