import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MainPage } from "./src/MainPage";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainPage />
    </SafeAreaProvider>
  );
}
