import React from "react";
import { View, Text, StyleSheet } from "react-native";

export class DemoCustomComponent extends React.Component {
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

const styles = StyleSheet.create({
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
});
