import { CustomViewState, DivKitJson, JSONValue } from "./ExpoDivKit.types";
import { CUSTOM_PROPS, CUSTOM_PROPS_ID, CUSTOM_TYPE } from "./constants";

/**
 * Делает копию объекта и индексирует вложенные свойства, содержащие "custom_type"
 * Добавляет в "custom_props" свойство "nativeViewId" с уникальным идентификатором
 */
export function deepCopyAndIndexCustom(
  divKitJson: DivKitJson,
): [DivKitJson, Omit<CustomViewState, "Component">[]] {
  const componentIndex = 0;
  const [deepCopy, customComponents] = deepCopyAndIndexCustomRecursive(
    divKitJson,
    componentIndex,
  );
  return [deepCopy as DivKitJson, customComponents];
}

function deepCopyAndIndexCustomRecursive(
  jsonValue: JSONValue,
  componentIndex: number,
): [JSONValue, Omit<CustomViewState, "Component">[]] {
  let currentComponentIndex = componentIndex;

  const customComponents: Omit<CustomViewState, "Component">[] = [];
  if (jsonValue === null || typeof jsonValue !== "object") {
    return [jsonValue, customComponents];
  }

  const copy = Array.isArray(jsonValue) ? [] : {};

  for (const prop in jsonValue) {
    if (jsonValue.hasOwnProperty(prop)) {
      const [deepCopyValue, nested] = deepCopyAndIndexCustomRecursive(
        jsonValue[prop],
        currentComponentIndex,
      );
      customComponents.push(...nested);

      /**
       * При обходе объекта с "custom_type" добавляет в "custom_props" свойство "nativeViewId"
       */
      if (prop === CUSTOM_TYPE) {
        const customType = String(deepCopyValue);
        const customProps = copy[CUSTOM_PROPS] ?? {};
        const nativeViewId = String(++currentComponentIndex);

        customProps[CUSTOM_PROPS_ID] = nativeViewId;
        copy[CUSTOM_PROPS] = customProps;
        customComponents.push({ customType, nativeViewId });
      }

      /**
       * Если встретили "custom_props" в копируемом объекте, то добавляем в "custom_props"
       * свойство "nativeViewId" и переопределяем копию
       */
      if (
        prop === CUSTOM_PROPS &&
        typeof copy[prop] === "object" &&
        deepCopyValue !== null
      ) {
        const nativeViewId = copy[prop][CUSTOM_PROPS_ID];
        deepCopyValue[CUSTOM_PROPS_ID] = nativeViewId;
      }
      copy[prop] = deepCopyValue;
    }
  }

  return [copy, customComponents];
}
