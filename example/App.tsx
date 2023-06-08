import * as ExpoDivKit from "expo-divkit";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import jsonFile from "./div_json.json";

export default function App() {
  const [json, setJson] = React.useState<object | null>(jsonFile);

  return (
    <Pressable
      onPress={() => (json ? setJson(null) : setJson(jsonFile))}
      style={styles.container}
    >
      <View style={styles.container}>
        {json ? (
          <ExpoDivKit.ExpoDivKitView
            style={{ flex: 1, backgroundColor: "purple" }}
            json={json}
          >
            <View style={styles.view} />
          </ExpoDivKit.ExpoDivKitView>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    width: 100,
    height: 100,
    backgroundColor: "#234267",
  },
});
