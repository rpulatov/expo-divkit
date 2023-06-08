import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type ExpoDivKitViewProps = {
  json: { templates: { [key: string]: any }; card: { [key: string]: any } };
} & ViewProps;

export type NativeViewProps = ExpoDivKitViewProps & {
  onRenderCustomViewRequested: (e: EventRenderCustomViewRequested) => void;
};

export type EventRenderCustomViewRequested = {
  nativeEvent: { nativeViewId: string; customType: string };
};
