import type { PhosphorIconName } from "components/common";
import type { InviteInfo } from "screens/sheets";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {
  type BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

import { useMainNavigation } from "navigations";

import { postGroupJoin, useGetGroup } from "api/endpoints/group/group";
import { getInviteCode } from "api/endpoints/invite/invite";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { Empty, HStack, PhosphorIcon, Text, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { InviteCode, JoinGroup, Nickname } from "screens/sheets";

const Group: React.FC = () => {
  const navigation = useMainNavigation();
  const { dismissAll } = useBottomSheetModal();

  const { styles, colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const { data, refetch, isRefetching } = useGetGroup();

  const codeSheetRef = React.useRef<BottomSheetModal>(null);
  const joinSheetRef = React.useRef<BottomSheetModal>(null);
  const nicknameSheetRef = React.useRef<BottomSheetModal>(null);

  const [inviteInfo, setInviteInfo] = React.useState<InviteInfo>(
    {} as InviteInfo,
  );

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetching) return;
    setRefreshing(isRefetching);
  }, [isRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  const invite = async (code: string) => {
    startLoading();
    try {
      const response = await getInviteCode(code);
      setInviteInfo({
        code,
        name: response.group_name,
        description: response.group_description,
        owner: response.group_owner_nickname,
        rule: response.nickname_policy,
      });
      joinSheetRef.current?.present();
    } finally {
      endLoading();
    }
  };

  const join = async (nickname: string) => {
    startLoading();
    try {
      await postGroupJoin({
        invite_code: inviteInfo.code,
        nickname,
      });
      await refetch();
      dismissAll();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      dim
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}
      trailingIcon={{
        name: "Plus",
        onPress: () => {
          navigation.navigate("PagesStack", {
            screen: "CreateGroup",
          });
        },
      }}>
      <Wrapper
        data={data}
        empty={
          <VStack justify="center" gap={800} fill>
            <Empty>참여하고 있는 그룹이 없어요.</Empty>
            <Item
              icon="Plus"
              dim
              onPress={() => {
                codeSheetRef.current?.present();
              }}>
              초대 코드로 그룹 참여하기
            </Item>
          </VStack>
        }>
        {(data) => (
          <VStack gap={400}>
            <Text type="body" weight="semiBold" color={colors.gray[800]}>
              그룹 목록
            </Text>
            <VStack gap={300}>
              <FlatList
                data={data}
                scrollEnabled={false}
                contentContainerStyle={styles.gap.all[300]}
                renderItem={({ item }) => (
                  <Item
                    icon="Graph"
                    onPress={() => {
                      navigation.navigate("PagesStack", {
                        screen: "ViewGroup",
                        params: {
                          id: item.id,
                        },
                      });
                    }}>
                    {item.name}
                  </Item>
                )}
              />
              <Item
                icon="Plus"
                dim
                onPress={() => {
                  codeSheetRef.current?.present();
                }}>
                초대 코드로 그룹 참여하기
              </Item>
            </VStack>
          </VStack>
        )}
      </Wrapper>
      <InviteCode sheetRef={codeSheetRef} onSubmit={invite} />
      <JoinGroup
        sheetRef={joinSheetRef}
        info={inviteInfo}
        onSubmit={() => {
          nicknameSheetRef.current?.present();
        }}
      />
      <Nickname
        sheetRef={nicknameSheetRef}
        rule={inviteInfo.rule}
        onSubmit={join}
      />
    </Container>
  );
};

interface ItemProps {
  children: string;
  icon: PhosphorIconName;
  dim?: boolean;
  onPress?: () => void;
}
const Item: React.FC<ItemProps> = ({
  children,
  icon,
  dim = false,
  onPress,
}) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        align="center"
        gap={200}
        style={[
          styles.padding.vertical[400],
          styles.padding.horizontal[600],
          styles.radius.all[400],
          styles.$background(dim ? colors.gray[200] : colors.gray[0]),
        ]}>
        <PhosphorIcon name={icon} size={20} color={colors.gray[400]} />
        <Text
          type="body"
          weight="medium"
          color={dim ? colors.gray[400] : colors.gray[700]}>
          {children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { Group };
