import * as React from "react";
import { findNodeHandle, LayoutChangeEvent, View } from "react-native";

import { CustomComponentLibrary } from "./CustomComponent";
import {
  CustomViewState,
  DivKitJson,
  EventHeightChanged,
  ExpoDivKitViewProps,
  LayoutHeight,
  LayoutParam,
} from "./ExpoDivKit.types";
import { NativeModule } from "./NativeModule";
import { NativeView } from "./NativeView";
import { deepCopyAndIndexCustom } from "./utils";

export function ExpoDivKitView({
  json,
  safeAreaInsets,
  flex = false,
}: ExpoDivKitViewProps) {
  const refView = React.useRef<View>(null);
  const [customViews, setCustomViews] = React.useState<CustomViewState[]>([]);
  const [rootViewHeight, setRootViewHeight] = React.useState<number>(0);
  const [layoutHeight, setLayoutHeight] = React.useState<LayoutHeight>(
    LayoutParam.WRAP_CONTENT,
  );

  const [indexedJson, setIndexedJson] = React.useState<DivKitJson>(json);

  const initialization = (data: DivKitJson) => {
    const deepCopy = deepCopyAndIndexCustom(data);
    const [indexedJson, customViews] = deepCopy;

    setIndexedJson(indexedJson);
    setCustomViews(customViews);
    /**
     * Изменение высоты необходимо чтобы принудительно вызвать перерисовку лайаута,
     * иначе она сама не вызывается.
     * При перерисовке лайаута будет вызван onHeightChanged и это событие корректно обновит высоту
     */
    setRootViewHeight((prev) => (prev > 0 ? prev - 1 : prev + 1));
  };

  const onHeightChanged = (e: EventHeightChanged) => {
    setRootViewHeight(e.nativeEvent.height);
  };

  const onLayout = () => {
    if (refView.current) {
      NativeModule.onCustomViewRendered(findNodeHandle(refView.current));
    }
  };

  const onLayoutWrapper = (e: LayoutChangeEvent) => {
    setLayoutHeight(
      flex ? e.nativeEvent.layout.height : LayoutParam.WRAP_CONTENT,
    );
  };

  React.useEffect(() => {
    initialization(json);
  }, [json]);

  return (
    <View style={flex ? { flex: 1 } : undefined} onLayout={onLayoutWrapper}>
      <NativeView
        ref={refView}
        json={indexedJson}
        onHeightChanged={onHeightChanged}
        style={{ height: rootViewHeight }}
        layoutHeight={layoutHeight}
        safeAreaInsets={safeAreaInsets}
      >
        {customViews.map(({ nativeViewId, customType }) => {
          const Component = CustomComponentLibrary.get(customType);
          return Component ? (
            <View
              key={nativeViewId}
              nativeID={nativeViewId}
              style={{ position: "absolute", left: 0, right: 0, top: 0 }}
              // TODO: #104735
              onLayout={onLayout}
            >
              <Component />
            </View>
          ) : null;
        })}
      </NativeView>
    </View>
  );
}
