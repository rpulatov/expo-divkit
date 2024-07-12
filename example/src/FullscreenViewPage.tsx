import { ExpoDivKitView } from "expo-divkit";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import jsonFile from "../assets/div_json.json";
import shimmer from "../assets/div_shimmer.json";

const sameCopy = JSON.parse(JSON.stringify(jsonFile));

type FullscreenViewPageProps = {
  page: number;
};
export function FullscreenViewPage({ page }: FullscreenViewPageProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <ExpoDivKitView
        json={
          page === 3
            ? shimmer
            : page === 4
              ? jsonFile
              : page === 5
                ? sameCopy
                : page === 6
                  ? jsonFile
                  : page === 7
                    ? sameCopy
                    : jsonFile
        }
        variables={{
          safeAreaTop: insets.top,
          safeAreaRight: insets.right,
          safeAreaBottom: insets.bottom,
          safeAreaLeft: insets.left,
        }}
        flex
      />
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
