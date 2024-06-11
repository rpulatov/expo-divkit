import { CustomViewComponent } from "./ExpoDivKit.types";

export const CustomComponentLibrary = new Map<string, CustomViewComponent>();

export function initCustomComponent(
  customType: string,
  component: CustomViewComponent,
) {
  CustomComponentLibrary.set(customType, component);
}
