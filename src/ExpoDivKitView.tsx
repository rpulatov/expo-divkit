import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { ExpoDivKitViewProps } from "./ExpoDivKit.types";

const NativeView: React.ComponentType<ExpoDivKitViewProps> =
  requireNativeViewManager("ExpoDivKit");

const customComponents = new Map<string, () => React.ReactElement>();

export function initCustomComponent(
  customType: string,
  component: () => React.ReactElement
) {
  customComponents.set(customType, component);
}

export function ExpoDivKitView(props: ExpoDivKitViewProps) {
  return <NativeView {...props} />;
}
