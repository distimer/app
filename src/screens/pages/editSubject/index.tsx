import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import { deleteSubjectId, putSubjectId } from "api/endpoints/subject/subject";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { ButtonItem, CardItem, InputItem, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { ColorPicker, Confirm } from "screens/sheets";
import { SubjectCategory } from "screens/sheets/subjectCategory";

const EditSubject = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditSubject">>();
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const categorySheetRef = React.useRef<BottomSheetModal>(null);
  const colorSheetRef = React.useRef<BottomSheetModal>(null);
  const confirmSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetCategory();

  const categoryData = React.useMemo(() => {
    if (!data) return undefined;
    return data.find((category) =>
      category.subjects.some((subject) => subject.id === params.id),
    );
  }, [data, params.id]);
  const subjectData = React.useMemo(() => {
    if (!data) return undefined;
    return data
      .map((category) => category.subjects)
      .flat()
      .find((subject) => subject.id === params.id);
  }, [data, params.id]);

  console.log(categoryData);
  console.log(subjectData);

  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [color, setColor] = React.useState("");
  const tempCategoryName = React.useMemo(() => {
    if (!data) return "";
    return data.find((item) => item.id === category)?.name || "";
  }, [category, data]);

  React.useEffect(() => {
    if (!subjectData) return;
    setName(subjectData.name);
    setColor(subjectData.color);
  }, [subjectData]);
  React.useEffect(() => {
    if (!categoryData) return;
    setCategory(categoryData.id);
  }, [categoryData]);

  const isChanged = React.useMemo(() => {
    if (!subjectData || !categoryData) return false;
    return (
      name !== subjectData.name ||
      category !== categoryData.id ||
      color !== subjectData.color
    );
  }, [name, category, color, subjectData, categoryData]);

  const submit = async () => {
    startLoading();
    try {
      await putSubjectId(params.id, {
        category_id: category,
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
      await deleteSubjectId(params.id);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="과목 설정"
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
        disabled: !isChanged || !pass,
        onPress: submit,
      }}>
      <Wrapper
        data={
          categoryData !== undefined && subjectData !== undefined
            ? {
                category: categoryData,
                subject: subjectData,
              }
            : undefined
        }>
        {(data) => (
          <VStack gap={800}>
            <CardItem
              title={data.subject.name}
              description={data.category.name}
              color={data.subject.color}
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
              subtitle={tempCategoryName}
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
            <ColorPicker
              sheetRef={colorSheetRef}
              color={color}
              setColor={setColor}
            />
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
          </VStack>
        )}
      </Wrapper>
    </Container>
  );
};

export { EditSubject };
