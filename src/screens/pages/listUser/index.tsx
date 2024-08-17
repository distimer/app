import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import { useGetGroup, useGetGroupMemberId } from "api/endpoints/group/group";
import { useGetTimerGroupId } from "api/endpoints/timer/timer";
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

  const [target, setTarget] = React.useState("");

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
  const {
    data: timers,
    refetch: refetchTimers,
    isRefetching: isRefetchingTimers,
  } = useGetTimerGroupId(params.id, {
    query: {
      retry: false,
      refetchInterval: 5000,
    },
  });
  const { data: profile } = useGetUser();

  const group = React.useMemo(() => {
    if (!groups) return undefined;

    const data = groups.find((group) => group.id === params.id);
    if (data) return data;
    navigation.goBack();
  }, [groups, navigation, params.id]);
  const me = React.useMemo(() => {
    if (!members || !profile) return undefined;

    const data = members.find((member) => member.user_id === profile.user_id);
    if (data) return data;
    navigation.goBack();
  }, [members, navigation, profile]);
  const studying = React.useMemo(() => {
    if (members === undefined) return undefined;

    const result: {
      [key: string]: boolean;
    } = {};
    for (const member of members) {
      const timer = timers?.find(
        (timer) => timer.affiliation.user_id === member.user_id,
      );
      result[member.user_id] = timer !== undefined;
    }

    return result;
  }, [members, timers]);
  const user = React.useMemo(() => {
    if (members === undefined) return undefined;

    const member = members.find((member) => member.user_id === target);
    if (!member)
      return {
        id: "",
        nickname: "",
        timer: undefined,
      };

    if (timers === undefined)
      return {
        id: member.user_id,
        nickname: member.nickname,
        timer: undefined,
      };

    const timer = timers.find((timer) => timer.affiliation.user_id === target);
    return {
      id: member.user_id,
      nickname: member.nickname,
      timer: timer
        ? {
            color: timer.subject.color,
            subject: timer.subject.name,
            content: timer.content,
            startTime: timer.start_at,
          }
        : undefined,
    };
  }, [members, target, timers]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetchingMembers || isRefetchingGroups || isRefetchingTimers) return;
    setRefreshing(false);
  }, [isRefetchingMembers, isRefetchingGroups, isRefetchingTimers]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMembers();
    await refetchGroups();
    await refetchTimers();
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
          members !== undefined && group !== undefined && studying !== undefined
            ? { members, group, studying }
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
                  setTarget(item.user_id);
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
                    {data.studying[item.user_id] && (
                      <Text
                        type="subheadline"
                        weight="medium"
                        color={colors.gray[500]}>
                        학습중
                      </Text>
                    )}
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
          me !== undefined && group !== undefined && user !== undefined
            ? { me, group, user }
            : undefined
        }>
        {(data) => (
          <UserAction
            sheetRef={sheetRef}
            group={params.id}
            user={data.user}
            canEdit={data.me.role === 2 && data.user.id !== data.me.user_id}
            canView={data.me.role >= data.group.reveal_policy}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export { ListUser };
