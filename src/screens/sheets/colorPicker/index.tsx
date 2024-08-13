import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";

import ColorPickerContainer, { Panel5 } from "reanimated-color-picker";

import { SheetContainer, VStack } from "components/common";

interface ColorPickerProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
const ColorPicker: React.FC<ColorPickerProps> = ({
  sheetRef,
  color,
  setColor,
}) => {
  const [tempColor, setTempColor] = React.useState(color);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="색 선택"
      button={{
        title: "확인",
        onPress: () => {
          setColor(tempColor);
          sheetRef.current?.close();
        },
      }}>
      <VStack gap={600}>
        <ColorPickerContainer
          value={color}
          onComplete={({ hex }) => {
            setTempColor(hex);
          }}>
          <Panel5 />
        </ColorPickerContainer>
      </VStack>
    </SheetContainer>
  );
};

export { ColorPicker };
