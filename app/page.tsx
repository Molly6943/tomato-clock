"use client";
import Timer from "./components/Timer";
import styles from "./page.module.css";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>
       <Timer />
      </Box>
    </main>
  );
}
