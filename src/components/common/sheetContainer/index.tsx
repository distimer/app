import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { ContainerSharedProps } from "components/layout";

import React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useTheme } from "contexts/theme";

import { Container } from "components/layout";

interface SheetContainerProps extends ContainerSharedProps {
  children: React.ReactNode;
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  previous?: boolean;
  fixed?: boolean;
  showClose?: boolean;
  onDismiss?: () => void;
}
const SheetContainer: React.FC<SheetContainerProps> = ({
  children,
  sheetRef,
  previous,
  fixed = false,
  showClose = true,
  onDismiss,
  ...props
}) => {
  const { styles, colors } = useTheme();

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={!fixed}
      snapPoints={fixed ? ["80%"] : undefined}
      handleComponent={() => null}
      backgroundStyle={[
        styles.radius.top[800],
        styles.$background(colors.gray[0]),
      ]}
      onDismiss={onDismiss}
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive">
      <BottomSheetView style={[fixed && styles.$flex(1)]}>
        <Container
          sheet
          fill={fixed}
          leadingIcon={
            showClose
              ? {
                  name: previous ? "CaretLeft" : "X",
                  onPress: () => {
                    sheetRef.current?.dismiss();
                  },
                }
              : undefined
          }
          {...props}>
          {children}
        </Container>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export { SheetContainer };
