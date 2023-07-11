# expo-divkit

Divkit render library for react-native expo

## Installation in managed Expo projects

```
expo install expo-divkit
```

## How to use

```React
import { ScrollView } from "react-native"
import { ExpoDivKitView } from "expo-divkit"

const jsonPage = {
  "templates": {
    "title": {
      "type": "text",
      "font_size": 20,
      "line_height": 24,
      "font_weight": "bold",
      "paddings": {
        "left": 24,
        "right": 24,
        "bottom": 16
      }
    },
  },
  "card": {
    "log_id": "sample_card",
    "states": [{
      "state_id": 0,
      "div": {
        "type": "container",
        "orientation": "vertical",
        "margins": {
          "top": 24,
          "bottom": 24
        },
        "items": [{
          "type": "title",
          "text": "Hello world",
        }]
      }
    }]
  }
}

function App() {
    return <ScrollView>
       <ExpoDivKitView json={jsonPage} />
    </ScrollView>
}
```
