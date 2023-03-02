import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type ExpoDivKitViewProps = {
  name: string;
} & ViewProps;
