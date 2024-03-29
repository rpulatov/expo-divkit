import {
  requireNativeModule,
  requireNativeViewManager,
} from "expo-modules-core";
import * as React from "react";
import { findNodeHandle, View } from "react-native";

import {
  CustomViewComponent,
  CustomViewState,
  DivKitJson,
  EventHeightChanged,
  ExpoDivKitViewProps,
  ExpoDivKitViewState,
  NativeViewProps,
} from "./ExpoDivKit.types";

const COMPONENT_NAME = "ExpoDivKit";

const СustomComponentLibrary = new Map<string, CustomViewComponent>();

export function initCustomComponent(
  customType: string,
  component: CustomViewComponent
) {
  СustomComponentLibrary.set(customType, component);
}

class IndexObject {
  value = -1;
  inc() {
    this.value += 1;
    return this.value;
  }
}

export class ExpoDivKitView extends React.Component<
  ExpoDivKitViewProps,
  ExpoDivKitViewState
> {
  isNeedToReportOfRender = false;
  refView: React.RefObject<View>;

  constructor(props) {
    super(props);
    this.state = {
      customViews: [],
      rootViewHeight: 0,
    };
    this.refView = React.createRef();
  }

  componentDidMount() {
    this._initialization(this.props.json);
  }

  componentDidUpdate(
    prevProps: ExpoDivKitViewProps,
    prevState: ExpoDivKitViewState
  ) {
    if (prevProps.json !== this.props.json) {
      this._initialization(this.props.json);
    }
  }

  _initialization = (data: DivKitJson) => {
    const CUSTOM_TYPE = "custom_type";
    const CUSTOM_PROPS = "custom_props";
    const CUSTOM_PROPS_ID = "nativeViewId";

    function deepCopyAndIndexCustom(
      obj: any,
      indexObject: IndexObject
    ): [any, Omit<CustomViewState, "Component">[]] {
      const customComponents: Omit<CustomViewState, "Component">[] = [];
      if (obj === null || typeof obj !== "object") {
        return [obj, customComponents];
      }

      const copy = Array.isArray(obj) ? [] : {};

      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          const [deepCopyValue, nested] = deepCopyAndIndexCustom(
            obj[prop],
            indexObject
          );
          customComponents.push(...nested);

          if (prop === CUSTOM_TYPE) {
            const customType = String(deepCopyValue);
            const customProps = copy[CUSTOM_PROPS] ?? {};
            const nativeViewId = String(indexObject.inc());

            customProps[CUSTOM_PROPS_ID] = nativeViewId;
            copy[CUSTOM_PROPS] = customProps;
            customComponents.push({ customType, nativeViewId });
          }
          if (prop === CUSTOM_PROPS && typeof copy[prop] === "object") {
            const nativeViewId = copy[prop][CUSTOM_PROPS_ID];
            deepCopyValue[CUSTOM_PROPS_ID] = nativeViewId;
          }
          copy[prop] = deepCopyValue;
        }
      }

      return [copy, customComponents];
    }

    const deepCopy = deepCopyAndIndexCustom(data, new IndexObject());
    const [indexedJson, customViews] = deepCopy;
    this.setState({ indexedJson, customViews });
  };

  onHeightChanged = (e: EventHeightChanged) => {
    this.setState({ rootViewHeight: e.nativeEvent.height });
  };

  onLayout = () => {
    if (this.refView.current) {
      NativeModule.onCustomViewRendered(findNodeHandle(this.refView.current));
    }
  };

  render() {
    const { indexedJson } = this.state;

    return indexedJson ? (
      <NativeView
        ref={this.refView}
        json={indexedJson}
        onHeightChanged={this.onHeightChanged}
        style={{ width: "100%", height: this.state.rootViewHeight }}
      >
        {this.state.customViews.map(({ nativeViewId, customType }) => {
          const Component = СustomComponentLibrary.get(customType);
          return Component ? (
            <View
              key={nativeViewId}
              nativeID={nativeViewId}
              style={{ position: "absolute", left: 0, right: 0, top: 0 }}
              // TODO: #104735
              onLayout={this.onLayout}
            >
              <Component />
            </View>
          ) : null;
        })}
      </NativeView>
    ) : null;
  }
}

const NativeView: React.ComponentType<NativeViewProps> =
  requireNativeViewManager(COMPONENT_NAME);

const NativeModule = requireNativeModule(COMPONENT_NAME);
