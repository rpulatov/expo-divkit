import { ExpoDivKitView, initCustomComponent } from "expo-divkit";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

import jsonFile from "./div_json.json";

class TestViewComponent extends React.Component<{ nativeID: string }> {
  state = {
    show: false,
  };

  componentDidMount() {
    // this.setState({ show: true });
  }

  render(): React.ReactNode {
    return (
      <View nativeID={this.props.nativeID} style={styles.view2}>
        <View style={this.state.show ? styles.view : styles.view2}>
          <Text>RENDERED FROM REACT 1</Text>
          <Text>RENDERED FROM REACT 2</Text>
          <Text>RENDERED FROM REACT 3</Text>
        </View>
      </View>
    );
  }
}

initCustomComponent("demo_custom", TestViewComponent);

export default function App() {
  const [json, setJson] = React.useState<typeof jsonFile | null>(jsonFile);

  return (
    <Pressable
      onPress={() => (json ? setJson(null) : setJson(jsonFile))}
      style={styles.container}
    >
      <View style={styles.container}>
        {json ? (
          <ExpoDivKitView style={{ width: "100%", height: 500 }} json={json} />
        ) : null}
        <View style={styles.footer}>
          <Text>FOOTERS</Text>
        </View>
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
    height: 200,
    backgroundColor: "#86a57e",
  },
  view2: {
    width: "100%",
    height: 200,
    backgroundColor: "#86a57e",
  },
  footer: {
    width: "100%",
    height: 50,
    backgroundColor: "#3f5aab",
  },
});
