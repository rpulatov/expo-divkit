import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoDivKit.web.ts
// and on native platforms to ExpoDivKit.ts
import { ChangeEventPayload, ExpoDivKitViewProps } from "./ExpoDivKit.types";
import ExpoDivKitModule from "./ExpoDivKitModule";
import ExpoDivKitView from "./ExpoDivKitView";

// Get the native constant value.
export const PI = ExpoDivKitModule.PI;

export function hello(): string {
  return ExpoDivKitModule.hello();
}

export function getTheme(): string {
  return ExpoDivKitModule.getTheme();
}

export async function setValueAsync(value: string) {
  return await ExpoDivKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoDivKitModule ?? NativeModulesProxy.ExpoDivKit
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ExpoDivKitView, ExpoDivKitViewProps, ChangeEventPayload };
