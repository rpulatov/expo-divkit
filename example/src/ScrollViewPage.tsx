import { ExpoDivKitView } from "expo-divkit";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import jsonFile from "../assets/div_json.json";
import shimmer from "../assets/div_shimmer.json";

const sameCopy = JSON.parse(JSON.stringify(jsonFile));

type ScrollViewPageProps = {
  page: number;
};

export function ScrollViewPage({ page }: ScrollViewPageProps) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container}>
      <ExpoDivKitView
        json={page === 0 ? shimmer : page === 1 ? jsonFile : sameCopy}
        safeAreaInsets={insets}
      />
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
