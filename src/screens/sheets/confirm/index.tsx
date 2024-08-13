import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";

import { useTheme } from "contexts/theme";

import { Button, HStack, SheetContainer, Text } from "components/common";

interface ConfirmProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
}
const Confirm: React.FC<ConfirmProps> = ({
  sheetRef,
  title,
  description,
  cancelText,
  confirmText,
  onConfirm,
}) => {
  const { colors } = useTheme();

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title={title}
      gap={800}
      showClose={false}>
      <Text
        type="body"
        weight="medium"
        color={colors.gray[500]}
        align="center"
        line={3}>
        {description}
      </Text>
      <HStack gap={300}>
        <Button
          outline
          fill
          onPress={() => {
            sheetRef.current?.dismiss();
          }}>
          {cancelText}
        </Button>
        <Button fill onPress={onConfirm}>
          {confirmText}
        </Button>
      </HStack>
    </SheetContainer>
  );
};

export { Confirm };
