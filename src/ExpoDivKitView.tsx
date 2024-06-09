import {
  requireNativeModule,
  requireNativeViewManager,
} from "expo-modules-core";
import * as React from "react";
import { findNodeHandle, View } from "react-native";

import { CustomComponentLibrary } from "./CustomComponent";
import {
  DivKitJson,
  EventHeightChanged,
  ExpoDivKitViewProps,
  ExpoDivKitViewState,
  NativeViewProps,
} from "./ExpoDivKit.types";
import { COMPONENT_NAME } from "./constants";
import { deepCopyAndIndexCustom } from "./utils";

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
    prevState: ExpoDivKitViewState,
  ) {
    if (prevProps.json !== this.props.json) {
      this._initialization(this.props.json);
    }
  }

  _initialization = (data: DivKitJson) => {
    const deepCopy = deepCopyAndIndexCustom(data);
    const [indexedJson, customViews] = deepCopy;
    this.setState({
      indexedJson,
      customViews,
      /**
       * Обнуляем высоту родительской view, чтобы заново ее пересчитать с обновленными данными.
       * Если это не сделать, то на android при изменении json не будет вызван onHeightChanged
       */
      rootViewHeight: 0,
    });
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
          const Component = CustomComponentLibrary.get(customType);
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
