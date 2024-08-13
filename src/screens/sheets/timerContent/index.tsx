import type { TimerType } from "../timerType";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { Keyboard } from "react-native";

import { InputItem, SheetContainer } from "components/common";

interface TimerContentProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  type: TimerType | "save";
  previous?: boolean;
  onSubmit: (value: string) => void;
}
const TimerContent: React.FC<TimerContentProps> = ({
  sheetRef,
  previous,
  onSubmit,
  type,
}) => {
  const [pass, setPass] = React.useState(false);
  const [tempValue, setTempValue] = React.useState<string>("");

  return (
    <SheetContainer
      sheetRef={sheetRef}
      previous={previous}
      title="공부 내용 설정"
      button={{
        title:
          type === "save"
            ? "저장하기"
            : type === "timer"
              ? "타이머 시작하기"
              : "공부 기록 추가하기",
        disabled: !pass,
        onPress: () => {
          Keyboard.dismiss();
          onSubmit(tempValue);
        },
      }}
      onDismiss={() => {
        setTempValue("");
      }}>
      <InputItem
        title="공부 내용"
        icon="Notepad"
        range={{
          min: 1,
          max: 30,
          pass,
          setPass,
        }}
        placeholder="공부 내용을 입력해 주세요"
        value={tempValue}
        setValue={setTempValue}
        sheet
      />
    </SheetContainer>
  );
};

export { TimerContent };
