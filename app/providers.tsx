"use client";

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
