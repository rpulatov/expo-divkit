import { ExpoDivKitView, initCustomComponent } from "expo-divkit";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

import jsonFile from "./div_json.json";

class TestViewComponent extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    // this.setState({ show: true });
    console.log("set timeout");
    setTimeout(() => {
      console.log("timeouted");
      this.setState({ show: true });
    }, 10000);
  }

  render(): React.ReactNode {
    return (
      <View style={this.state.show ? styles.view2 : styles.view}>
        <Text>RENDERED FROM REACT 1</Text>
        <Text>RENDERED FROM REACT 2</Text>
        {this.state.show ? <Text>RENDERED FROM REACT 3</Text> : null}
      </View>
    );
  }
}

initCustomComponent("demo_custom", TestViewComponent);

export default function App() {
  const [json, setJson] = React.useState<typeof jsonFile | null>(jsonFile);

  return (
    <View style={styles.container}>
      {json ? <ExpoDivKitView json={json} /> : null}

      <Pressable
        onPress={() => (json ? setJson(null) : setJson(jsonFile))}
        style={styles.footer}
      >
        <Text>SHOW/HIDEddd</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    width: "100%",
    height: 100,
    backgroundColor: "#86057e",
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
