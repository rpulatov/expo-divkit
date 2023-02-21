import { StyleSheet, Text, View } from 'react-native';

import * as ExpoDivKit from 'expo-divkit';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoDivKit.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
