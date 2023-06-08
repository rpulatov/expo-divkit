import { ExpoDivKitView, initCustomComponent } from "expo-divkit";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

import jsonFile from "./div_json.json";

function TestViewComponent() {
  return <View style={styles.view} />;
}

initCustomComponent("test", TestViewComponent);

export default function App() {
  const [json, setJson] = React.useState<object | null>(jsonFile);

  return (
    <Pressable
      onPress={() => null /* (json ? setJson(null) : setJson(jsonFile))*/}
      style={styles.container}
    >
      <View style={styles.container}>
        {json ? (
          <ExpoDivKitView
            style={{ flex: 1, backgroundColor: "purple" }}
            json={json}
          />
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
