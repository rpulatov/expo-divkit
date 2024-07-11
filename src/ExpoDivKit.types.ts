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

export type EdgeSafeAreaInsets = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type ExpoDivKitViewProps = {
  json: DivKitJson;
  safeAreaInsets?: EdgeSafeAreaInsets;
  flex?: boolean;
} & React.RefAttributes<View> &
  React.ComponentProps<typeof View>;

export type NativeViewProps = ExpoDivKitViewProps & {
  onHeightChanged: (e: EventHeightChanged) => void;
  layoutHeight?: LayoutHeight;
};

export type EventRenderCustomViewRequested = NativeSyntheticEvent<{
  nativeViewId: string;
  customType: string;
}>;

export type EventHeightChanged = NativeSyntheticEvent<{ height: number }>;

export type CustomViewComponent = React.ComponentClass;

export type LayoutHeight = LayoutParam | number;
export enum LayoutParam {
  MATCH_PARENT = -1,
  WRAP_CONTENT = -2,
}
