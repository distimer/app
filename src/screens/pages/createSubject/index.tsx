import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import { postSubjectId } from "api/endpoints/subject/subject";

import { useLoading } from "contexts/loading";

import { ButtonItem, InputItem } from "components/common";
import { Container } from "components/layout";

import { ColorPicker } from "screens/sheets";
import { SubjectCategory } from "screens/sheets/subjectCategory";

const CreateSubject = () => {
  const { params } =
    useRoute<RouteProp<PagesStackParamList, "CreateSubject">>();
  const navigation = useMainNavigation();

  const { startLoading, endLoading } = useLoading();

  const categorySheetRef = React.useRef<BottomSheetModal>(null);
  const colorSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetCategory();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState(params.id);
  const [color, setColor] = React.useState("#000000");
  const [pass, setPass] = React.useState(false);

  const categoryName = React.useMemo(
    () => data?.find((item) => item.id === category)?.name || "",
    [data, category],
  );

  const submit = async () => {
    startLoading();
    try {
      await postSubjectId(category, {
        name,
        color,
      });
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="과목 추가"
      gap={800}
      backable
      button={{
        title: "추가하기",
        disabled: !pass,
        onPress: submit,
      }}>
      <InputItem
        title="과목명"
        icon="GraduationCap"
        range={{
          min: 1,
          max: 20,
          pass,
          setPass,
        }}
        placeholder="과목명 입력"
        value={name}
        setValue={setName}
      />
      <ButtonItem
        title="카테고리"
        subtitle={categoryName}
        leadingIcon="Folder"
        trailingIcon="ArrowsClockwise"
        onPress={() => categorySheetRef.current?.present()}
      />
      <ButtonItem
        title="색상"
        subtitle={color}
        leadingColor={color}
        trailingIcon="Eyedropper"
        onPress={() => colorSheetRef.current?.present()}
      />
      <SubjectCategory
        sheetRef={categorySheetRef}
        initial={category}
        onSubmit={(category) => {
          setCategory(category);
          categorySheetRef.current?.dismiss();
        }}
      />
      <ColorPicker sheetRef={colorSheetRef} color={color} setColor={setColor} />
    </Container>
  );
};

export { CreateSubject };
