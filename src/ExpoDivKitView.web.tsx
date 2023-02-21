import * as React from 'react';

import { ExpoDivKitViewProps } from './ExpoDivKit.types';

export default function ExpoDivKitView(props: ExpoDivKitViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
