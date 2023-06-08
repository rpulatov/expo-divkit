import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { Text, View } from "react-native";

import {
  EventRenderCustomViewRequested,
  ExpoDivKitViewProps,
  NativeViewProps,
} from "./ExpoDivKit.types";

const customComponents = new Map<
  string,
  React.ComponentClass<{ nativeID: string }>
>();

export function initCustomComponent(
  customType: string,
  component: React.ComponentClass<{ nativeID: string }>
) {
  customComponents.set(customType, component);
}

export class ExpoDivKitView extends React.Component<
  ExpoDivKitViewProps,
  {
    customViews: JSX.Element[];
  }
> {
  state = {
    customViews: [],
  };

  onRenderCustomViewRequested = (e: EventRenderCustomViewRequested) => {
    const { customType, nativeViewId } = e.nativeEvent;

    console.log(e.nativeEvent);

    const CustomComponent = customComponents.get(customType);
    if (!CustomComponent) return;

    this.setState((prev) => ({
      customViews: [
        ...prev.customViews,
        <CustomComponent key={nativeViewId} nativeID={String(nativeViewId)} />,
      ],
    }));
  };

  render() {
    return (
      <NativeView
        {...this.props}
        onRenderCustomViewRequested={this.onRenderCustomViewRequested}
      >
        {this.state.customViews}
      </NativeView>
    );
  }
}

const NativeView: React.ComponentType<NativeViewProps> =
  requireNativeViewManager("ExpoDivKit");
