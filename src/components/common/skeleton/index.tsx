import type { LayoutRectangle } from "react-native";

import React from "react";
import { View } from "react-native";

import MaskedView from "@react-native-masked-view/masked-view";

interface SkeletonProps {
  children: React.ReactElement;
}
const Skeleton: React.FC<SkeletonProps> = ({ children }) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>();

  if (!layout?.width || !layout.height)
    return (
      <View
        style={{ opacity: 0 }}
        onLayout={(event) => {
          setLayout(event.nativeEvent.layout);
        }}>
        {children}
      </View>
    );

  return (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={children}>
      <View style={{ flex: 1, backgroundColor: "red" }} />
    </MaskedView>
  );
};

export { Skeleton };
