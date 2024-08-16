import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import { useGetGroup, useGetGroupMemberId } from "api/endpoints/group/group";
import { useGetUser } from "api/endpoints/user/user";

import { useTheme } from "contexts/theme";

import { HStack, PhosphorIcon, Text } from "components/common";
import { Container, Wrapper } from "components/layout";

import { UserAction } from "screens/sheets";

const ListUser = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "ListUser">>();
  const navigation = useMainNavigation();

  const { styles, colors } = useTheme();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const [target, setTarget] = React.useState({
    id: "",
    nickname: "",
  });

  const {
    data: groups,
    refetch: refetchGroups,
    isRefetching: isRefetchingGroups,
  } = useGetGroup();
  const {
    data: members,
    refetch: refetchMembers,
    isRefetching: isRefetchingMembers,
  } = useGetGroupMemberId(params.id);
  const { data: profile } = useGetUser();

  const group = React.useMemo(() => {
    if (!groups) return undefined;
    return groups.find((group) => group.id === params.id);
  }, [groups, params.id]);
  const me = React.useMemo(() => {
    if (!members || !profile) return undefined;
    return members.find((member) => member.user_id === profile?.user_id);
  }, [members, profile]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetchingMembers || isRefetchingGroups) return;
    setRefreshing(false);
  }, [isRefetchingMembers, isRefetchingGroups]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMembers();
    await refetchGroups();
  };

  return (
    <Container
      title="그룹원"
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}>
      <Wrapper
        data={
          members !== undefined && group !== undefined
            ? { members, group }
            : undefined
        }>
        {(data) => (
          <FlatList
            data={data.members.sort((a, b) =>
              a.nickname.localeCompare(b.nickname),
            )}
            scrollEnabled={false}
            contentContainerStyle={[styles.gap.all[300]]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setTarget({
                    id: item.user_id,
                    nickname: item.nickname,
                  });
                  sheetRef.current?.present();
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
                  <HStack align="center" gap={200}>
                    <PhosphorIcon
                      name="User"
                      size={20}
                      color={colors.gray[400]}
                    />
                    <Text type="body" weight="medium" color={colors.gray[700]}>
                      {item.nickname}
                    </Text>
                  </HStack>
                  <Text
                    type="subheadline"
                    weight="medium"
                    color={colors.gray[500]}>
                    {["맴버", "매니저", "그룹장"][item.role]}
                  </Text>
                </HStack>
              </TouchableOpacity>
            )}
          />
        )}
      </Wrapper>
      <Wrapper
        data={
          me !== undefined && group !== undefined ? { me, group } : undefined
        }>
        {(data) => (
          <UserAction
            sheetRef={sheetRef}
            nickname={target.nickname}
            canEdit={data.me.role === 2 && target.id !== data.me.user_id}
            canView={data.me.role >= data.group.reveal_policy}
            actions={{
              viewStudylogs: () => {
                sheetRef.current?.dismiss();
                navigation.navigate("PagesStack", {
                  screen: "OtherStudylogs",
                  params: {
                    group: data.group.id,
                    user: target.id,
                  },
                });
              },
              viewStatistics: () => {
                sheetRef.current?.dismiss();
                navigation.navigate("PagesStack", {
                  screen: "Statistics",
                  params: {
                    group: data.group.id,
                    user: target.id,
                  },
                });
              },
              editUser: () => {
                sheetRef.current?.dismiss();
                navigation.navigate("PagesStack", {
                  screen: "EditUser",
                  params: {
                    group: data.group.id,
                    user: target.id,
                  },
                });
              },
            }}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export { ListUser };
