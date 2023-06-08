import { ViewProps, View, NativeSyntheticEvent } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type DivKitJson = {
  templates: { [key: string]: any };
  card: { [key: string]: any };
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
  indexedJson?: DivKitJson;
  customViews: CustomViewState[];
  rootViewHeight?: number | string;
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
