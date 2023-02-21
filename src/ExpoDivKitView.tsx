import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoDivKitViewProps } from './ExpoDivKit.types';

const NativeView: React.ComponentType<ExpoDivKitViewProps> =
  requireNativeViewManager('ExpoDivKit');

export default function ExpoDivKitView(props: ExpoDivKitViewProps) {
  return <NativeView {...props} />;
}
