import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Clipboard from "@react-native-clipboard/clipboard";
import { useRoute } from "@react-navigation/native";

import {
  deleteInviteGroupIdCode,
  postInviteGroupId,
  useGetInviteGroupId,
} from "api/endpoints/invite/invite";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { Empty, HStack, PhosphorIcon, Text, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm } from "screens/sheets";

const InviteGroup = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "InviteGroup">>();

  const { styles, colors, values } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch, isRefetching } = useGetInviteGroupId(params.id);

  const [removeQue, setRemoveQue] = React.useState<string>("");

  const create = async () => {
    startLoading();
    try {
      await postInviteGroupId(params.id);
      await refetch();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteInviteGroupIdCode(params.id, removeQue);
      await refetch();
      sheetRef.current?.dismiss();
    } finally {
      endLoading();
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetching) return;
    setRefreshing(false);
  }, [isRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  return (
    <Container
      title="초대 코드"
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}>
      <Wrapper
        data={data}
        empty={
          <VStack justify="center" gap={800} fill>
            <Empty>생성된 초대 코드가 없어요.</Empty>
            <TouchableOpacity onPress={create}>
              <HStack
                align="center"
                gap={200}
                style={[
                  styles.padding.vertical[400],
                  styles.padding.horizontal[600],
                  styles.radius.all[400],
                  styles.$background(colors.gray[200]),
                ]}>
                <PhosphorIcon name="Plus" size={20} color={colors.gray[400]} />
                <Text type="body" weight="medium" color={colors.gray[400]}>
                  초대 코드 생성하기
                </Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
        }>
        {(data) => (
          <VStack gap={300}>
            <FlatList
              data={data}
              scrollEnabled={false}
              contentContainerStyle={[styles.gap.all[300]]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(item);
                  }}>
                  <HStack
                    align="center"
                    justify="between"
                    style={[
                      styles.padding.vertical[400],
                      styles.padding.horizontal[600],
                      styles.radius.all[400],
                      styles.$background(colors.gray[100]),
                    ]}>
                    <HStack gap={200}>
                      <PhosphorIcon
                        name="Key"
                        size={20}
                        color={colors.gray[400]}
                      />
                      <Text
                        type="body"
                        weight="medium"
                        color={colors.gray[700]}>
                        {item}
                      </Text>
                    </HStack>
                    <TouchableOpacity
                      hitSlop={values[400]}
                      onPress={() => {
                        setRemoveQue(item);
                        sheetRef.current?.present();
                      }}>
                      <PhosphorIcon
                        name="Trash"
                        size={20}
                        color={colors.gray[400]}
                      />
                    </TouchableOpacity>
                  </HStack>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={create}>
              <HStack
                align="center"
                gap={200}
                style={[
                  styles.padding.vertical[400],
                  styles.padding.horizontal[600],
                  styles.radius.all[400],
                  styles.$background(colors.gray[200]),
                ]}>
                <PhosphorIcon name="Plus" size={20} color={colors.gray[400]} />
                <Text type="body" weight="medium" color={colors.gray[400]}>
                  초대 코드 생성하기
                </Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
        )}
      </Wrapper>
      <Confirm
        sheetRef={sheetRef}
        title="초대 코드 삭제"
        description={
          "정말로 이 초대 코드를 삭제하시겠습니까?\n더 이상 이 코드로 그룹에 참가할 수 없습니다."
        }
        confirmText="삭제"
        cancelText="취소"
        onConfirm={remove}
      />
    </Container>
  );
};

export { InviteGroup };
