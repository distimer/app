import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type {
  CategoryctrlCategoryDTO,
  SubjectctrlSubjectDTO,
} from "api/schemas";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import { deleteSubjectId, putSubjectId } from "api/endpoints/subject/subject";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { ButtonItem, CardItem, InputItem } from "components/common";
import { Container } from "components/layout";

import { ColorPicker, Confirm } from "screens/sheets";

const EditSubject = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditSubject">>();
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const colorSheetRef = React.useRef<BottomSheetModal>(null);
  const confirmSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetCategory();

  const dataCategory = React.useMemo(
    () =>
      data?.find(
        (item) => item.id === params.categoryId,
      ) as CategoryctrlCategoryDTO,
    [data, params.categoryId],
  );
  const dataSubject = React.useMemo(
    () =>
      data
        ?.find((item) => item.id === params.categoryId)
        ?.subjects.find(
          (item) => item.id === params.subjectId,
        ) as SubjectctrlSubjectDTO,
    [data, params],
  );

  const [name, setName] = React.useState(dataSubject.name);
  const [color, setColor] = React.useState(dataSubject.color);
  const [pass, setPass] = React.useState(false);

  React.useEffect(() => {
    setName(dataSubject.name);
  }, [dataSubject.name]);

  const submit = async () => {
    startLoading();
    try {
      await putSubjectId(params.subjectId, {
        category_id: params.categoryId,
        name,
        color,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteSubjectId(params.subjectId);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="과목 설정"
      gap={800}
      backable
      scrollable
      trailingIcon={{
        name: "Trash",
        color: colors.solid.red,
        onPress: () => {
          confirmSheetRef.current?.present();
        },
      }}
      button={{
        title: "변경사항 저장하기",
        disabled: !pass,
        onPress: submit,
      }}>
      <CardItem
        title={dataSubject.name}
        description={dataCategory.name}
        color={dataSubject.color}
      />
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
        subtitle={dataCategory.name}
        leadingIcon="Folder"
        trailingIcon="ArrowsClockwise"
      />
      <ButtonItem
        title="색상"
        subtitle={color}
        leadingColor={color}
        trailingIcon="Eyedropper"
        onPress={() => colorSheetRef.current?.present()}
      />
      <ColorPicker sheetRef={colorSheetRef} color={color} setColor={setColor} />
      <Confirm
        sheetRef={confirmSheetRef}
        title="정말로 과목을 삭제하시겠습니까?"
        description={
          "해당 과목으로 등록된 학습 기록은\n모두 미분류로 이동됩니다."
        }
        confirmText="삭제하기"
        cancelText="취소하기"
        onConfirm={remove}
      />
    </Container>
  );
};

export { EditSubject };
