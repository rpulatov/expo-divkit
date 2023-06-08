import React from 'react'
import * as ExpoDivKit from "expo-divkit";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import jsonFile from './div_json.json'

export default function App() {

  const [json, setJson] = React.useState(jsonFile)


  return (
    <Pressable onPress={() => setJson({
      ...json,
      cards: json.cards.map(item => ({
        ...item,
        states: item.states.map(state => ({
          ...state,
          div: {
            ...state.div,
            items: state.div.items.map(val => ({
              ...val,
              favorites: String(Number(val.favorites) + 1)
            }))
          }
        }))
      }))
    })} style={styles.container}>
      <View style={styles.container}>
        <ExpoDivKit.ExpoDivKitView
          style={{ flex: 1, backgroundColor: "purple" }}
          json={json}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
