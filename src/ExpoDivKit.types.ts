import { View, NativeSyntheticEvent } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | JSONValue[];

export type DivKitJson = {
  templates: { [key: string]: JSONValue };
  card: { [key: string]: JSONValue };
};

export type CustomViewState = {
  nativeViewId: string;
  customType: string;
};

export type ExpoDivKitViewProps = {
  json: DivKitJson;
} & React.RefAttributes<View> &
  React.ComponentProps<typeof View>;

export type ExpoDivKitViewState = {
  stagedIndexedJson?: DivKitJson;
  committedIndexedJson?: DivKitJson;
  customViews: CustomViewState[];
  rootViewHeight?: number | "auto" | `${number}%`;
};

export type NativeViewProps = ExpoDivKitViewProps & {
  onHeightChanged: (e: EventHeightChanged) => void;
};

export type EventRenderCustomViewRequested = NativeSyntheticEvent<{
  nativeViewId: string;
  customType: string;
}>;

export type EventHeightChanged = NativeSyntheticEvent<{ height: number }>;

export type CustomViewComponent = React.ComponentClass;
