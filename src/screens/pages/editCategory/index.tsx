import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import {
  deleteCategoryId,
  putCategoryId,
  useGetCategory,
} from "api/endpoints/category/category";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { CardItem, InputItem } from "components/common";
import { Container } from "components/layout";

import { Confirm } from "screens/sheets";

const EditCategory = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditCategory">>();
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const confirmSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetCategory();

  const dataName = React.useMemo(
    () => data?.find((item) => item.id === params.id)?.name,
    [data, params.id],
  );

  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState(false);

  React.useEffect(() => {
    if (!dataName) return;
    setName(dataName);
  }, [dataName]);

  const submit = async () => {
    startLoading();
    try {
      await putCategoryId(params.id, {
        name,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteCategoryId(params.id);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="카테고리 설정"
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
        disabled: !pass || name === dataName,
        onPress: submit,
      }}>
      <CardItem title={dataName || name} description="카테고리" />
      <InputItem
        title="카테고리명"
        icon="FolderSimple"
        range={{ min: 1, max: 20, pass, setPass }}
        placeholder="카테고리명을 입력해 주세요"
        value={name}
        setValue={setName}
      />
      <Confirm
        sheetRef={confirmSheetRef}
        title="정말로 카테고리를 삭제하시겠습니까?"
        description={
          "카테고리를 삭제하기 전에 먼저\n하위에 속한 모든 과목을 삭제해 주세요."
        }
        confirmText="삭제하기"
        cancelText="취소하기"
        onConfirm={remove}
      />
    </Container>
  );
};

export { EditCategory };
