import type { DateSharedProps } from "../timerType";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import DatePickerContainer from "react-native-date-picker";

import { SheetContainer, VStack } from "components/common";

interface DatePickerProps extends DateSharedProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  onlyDate?: boolean;
}
const DatePicker: React.FC<DatePickerProps> = ({
  sheetRef,
  date,
  setDate,
  onlyDate,
}) => {
  const [tempDate, setTempDate] = React.useState(date);

  React.useEffect(() => {
    setTempDate(date);
  }, [date]);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="날짜 시간 선택"
      trailingIcon={{
        name: "ClockClockwise",
        onPress: () => {
          setTempDate(new Date(new Date().setSeconds(0)));
        },
      }}
      button={{
        title: "확인",
        onPress: () => {
          setDate(new Date(tempDate.setSeconds(0)));
          sheetRef.current?.dismiss();
        },
      }}>
      <VStack align="center">
        <DatePickerContainer
          date={tempDate}
          onDateChange={setTempDate}
          mode={onlyDate ? "date" : "datetime"}
        />
      </VStack>
    </SheetContainer>
  );
};

export { DatePicker };
