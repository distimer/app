import type { DateSharedProps } from "../timerType";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import DatePickerContainer from "react-native-date-picker";

import { SheetContainer, VStack } from "components/common";

interface DatePickerProps extends DateSharedProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
}
const DatePicker: React.FC<DatePickerProps> = ({ sheetRef, date, setDate }) => {
  const [tempDate, setTempDate] = React.useState(date);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="날짜 시간 선택"
      button={{
        title: "확인",
        onPress: () => {
          setDate(tempDate);
          sheetRef.current?.dismiss();
        },
      }}>
      <VStack align="center">
        <DatePickerContainer date={tempDate} onDateChange={setTempDate} />
      </VStack>
    </SheetContainer>
  );
};

export { DatePicker };
