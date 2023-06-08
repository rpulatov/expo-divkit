import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type ExpoDivKitViewProps = {
  json: {[key: string]: any}
} & ViewProps;
