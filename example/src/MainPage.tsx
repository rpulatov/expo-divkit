import { initCustomComponent } from "expo-divkit";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DemoCustomComponent } from "./DemoCustomComponent";
import { FullscreenViewPage } from "./FullscreenViewPage";
import { ScrollViewPage } from "./ScrollViewPage";

initCustomComponent("demo_custom", DemoCustomComponent);

export function MainPage() {
  const [page, setPage] = React.useState(0);

  return (
    <View style={styles.root}>
      {page >= 0 && page < 3 ? (
        <ScrollViewPage page={page} />
      ) : (
        <FullscreenViewPage page={page} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setPage((prev) => {
              if (prev === 0) {
                return 1;
              }
              if (prev === 1) {
                return 2;
              }
              return 0;
            })
          }
        >
          <Text style={styles.buttonText}>Scroll page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setPage((prev) => {
              if (prev >= 3 && prev <= 7) {
                return prev + 1;
              }
              return 3;
            })
          }
        >
          <Text style={styles.buttonText}>Full page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50,
  },
  button: {
    height: 50,
    backgroundColor: "blue",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
  },
});
