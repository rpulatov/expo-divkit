import { ExpoDivKitView } from "expo-divkit";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import jsonFile from "../assets/div_json.json";
export function FullscreenViewPage() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <ExpoDivKitView json={jsonFile} safeAreaInsets={insets} flex />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  div: {
    flex: 1,
    backgroundColor: "red",
  },
});
