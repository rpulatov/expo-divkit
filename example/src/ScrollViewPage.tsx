import { ExpoDivKitView } from "expo-divkit";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import jsonFile from "../assets/div_json.json";
export function ScrollViewPage() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container}>
      <ExpoDivKitView json={jsonFile} safeAreaInsets={insets} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  div: {
    width: "100%",
  },
});
