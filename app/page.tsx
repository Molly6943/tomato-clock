"use client";
import Timer from "./components/Timer";
import { VStack, Box, Center, Button } from "@chakra-ui/react";
import {useDisclosure} from '@chakra-ui/react'
import Image from "next/image";
import darkForest from "/public/img/darkforest.png";
import SettingsModal from './components/SettingsModal'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box zIndex={10} position="fixed" top={3} right={3}>
        <Button size="sm" variant="outline" color="white" onClick={onOpen}>
          Settings
        </Button>
      </Box>
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
      <SettingsModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
