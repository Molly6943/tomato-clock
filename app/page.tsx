"use client";
import Timer from "./components/Timer";
// import styles from "./page.module.css";
import { VStack, Box, Center, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import darkForest from "/public/img/darkforest.png";

export default function Home() {
  return (
    <VStack
      direction="column"
      overflowY="scroll"
      h="full"
      w="full"
      spacing={0}
      css={{
        height: "100vh",
        scrollSnapType: "y mandatory",
      }}
    >
      <Box>
        <Image
          src={darkForest}
          alt="forest"
          layout="fill"
          sizes="100vw"
          placeholder="blur"
          objectFit="cover"
        />
      </Box>
      <Center h="100vh">
      <Box w="100%" zIndex={9} color="white" scrollSnapAlign="start">
        <Timer />
      </Box>
      </Center>
    </VStack>
  );
}
