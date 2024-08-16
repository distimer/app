import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { Keyboard } from "react-native";

import { postCategory, useGetCategory } from "api/endpoints/category/category";

import { useLoading } from "contexts/loading";

import { InputItem, SheetContainer } from "components/common";

interface CreateCategoryProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
}
const CreateCategory: React.FC<CreateCategoryProps> = ({ sheetRef }) => {
  const { startLoading, endLoading } = useLoading();

  const { refetch } = useGetCategory();

  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState(false);

  const submit = async () => {
    Keyboard.dismiss();
    startLoading();
    try {
      await postCategory({
        name,
      });
      await refetch();
      sheetRef.current?.close();
    } finally {
      setName("");
      endLoading();
    }
  };

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="카테고리 추가"
      button={{
        title: "추가하기",
        disabled: !pass,
        onPress: submit,
      }}>
      <InputItem
        title="카테고리명"
        icon="FolderSimple"
        range={{
          min: 1,
          max: 20,
          pass,
          setPass,
        }}
        placeholder="카테고리명을 입력해 주세요"
        value={name}
        setValue={setName}
        sheet
      />
    </SheetContainer>
  );
};

export { CreateCategory };
