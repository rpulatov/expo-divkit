import * as ExpoDivKit from "expo-divkit";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoDivKit.hello()}</Text>
      <Text>Theme: {ExpoDivKit.getTheme()}</Text>
      <ExpoDivKit.ExpoDivKitView
        name="testName"
        style={{ flex: 1, backgroundColor: "purple" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
