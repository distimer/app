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

const CreateSubject = () => {
  const { params } =
    useRoute<RouteProp<PagesStackParamList, "CreateSubject">>();
  const navigation = useMainNavigation();

  const { startLoading, endLoading } = useLoading();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetCategory();

  const dataName = React.useMemo(
    () => data?.find((item) => item.id === params.id)?.name,
    [data, params.id],
  );

  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("#000000");
  const [pass, setPass] = React.useState(false);

  const submit = async () => {
    startLoading();
    try {
      await postSubjectId(params.id, {
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
        subtitle={dataName || ""}
        leadingIcon="Folder"
        trailingIcon="ArrowsClockwise"
      />
      <ButtonItem
        title="색상"
        subtitle={color}
        leadingColor={color}
        trailingIcon="Eyedropper"
        onPress={() => sheetRef.current?.present()}
      />
      <ColorPicker sheetRef={sheetRef} color={color} setColor={setColor} />
    </Container>
  );
};

export { CreateSubject };
