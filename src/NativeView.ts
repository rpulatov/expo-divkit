import { requireNativeViewManager } from "expo-modules-core";

import { NativeViewProps } from "./ExpoDivKit.types";
import { COMPONENT_NAME } from "./constants";

export const NativeView: React.ComponentType<NativeViewProps> =
  requireNativeViewManager(COMPONENT_NAME);
