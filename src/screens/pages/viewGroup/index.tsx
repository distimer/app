import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PhosphorIconName } from "components/common";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import {
  deleteGroupQuitId,
  useGetGroup,
  useGetGroupMemberId,
} from "api/endpoints/group/group";
import { useGetUser } from "api/endpoints/user/user";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { HStack, PhosphorIcon, Text, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm } from "screens/sheets";

const ViewGroup = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "ViewGroup">>();
  const navigation = useMainNavigation();

  const { styles, colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const sheetRef = React.useRef<BottomSheetModal>(null);

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
  const { data: user } = useGetUser();

  const group = React.useMemo(() => {
    if (!groups) return undefined;

    const data = groups.find((group) => group.id === params.id);
    if (data) return data;
    navigation.goBack();
  }, [groups, navigation, params.id]);
  const me = React.useMemo(() => {
    if (!members || !user) return undefined;

    const data = members.find((member) => member.user_id === user.user_id);
    if (data) return data;
    navigation.goBack();
  }, [members, navigation, user]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetchingGroups || isRefetchingMembers) return;
    setRefreshing(false);
  }, [isRefetchingGroups, isRefetchingMembers]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchGroups();
    await refetchMembers();
  };

  const isLoaded = group && members && me;

  const quit = async () => {
    if (!me) return;
    startLoading();
    try {
      await deleteGroupQuitId(params.id);
      await refetchGroups();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="그룹 정보"
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}
      trailingIcon={
        isLoaded && me.role !== 2
          ? {
              name: "DoorOpen",
              onPress: () => {
                sheetRef.current?.present();
              },
            }
          : undefined
      }>
      <Wrapper
        data={
          isLoaded
            ? {
                group,
                members,
                me,
              }
            : undefined
        }>
        {(data) => (
          <VStack gap={600}>
            <VStack gap={300} style={[styles.padding.horizontal[200]]}>
              <VStack gap={200}>
                <Text type="title2" weight="semiBold" color={colors.gray[800]}>
                  {data.group.name}
                </Text>
                <Text
                  type="subheadline"
                  weight="medium"
                  color={colors.gray[500]}>
                  {data.group.description}
                </Text>
              </VStack>
              <VStack gap={200}>
                <HStack align="center" gap={200}>
                  <PhosphorIcon name="Sword" color={colors.gray[400]} />
                  <Text
                    type="subheadline"
                    weight="medium"
                    color={colors.gray[400]}>
                    {data.group.owner_nickname}
                  </Text>
                </HStack>
                <HStack align="center" gap={200}>
                  <PhosphorIcon name="UsersThree" color={colors.gray[400]} />
                  <Text
                    type="subheadline"
                    weight="medium"
                    color={colors.gray[400]}>
                    {data.members.length}명
                  </Text>
                </HStack>
              </VStack>
            </VStack>
            <VStack gap={300}>
              <Item
                icon="User"
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "EditGroupProfile",
                    params: {
                      id: data.group.id,
                    },
                  });
                }}>
                그룹 프로필 수정
              </Item>
              <Item
                icon="ShareNetwork"
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "MyStudylogs",
                    params: {
                      group: data.group.id,
                    },
                  });
                }}>
                내가 공유한 학습기록
              </Item>
              <Item
                icon="UsersThree"
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "ListUser",
                    params: {
                      id: data.group.id,
                    },
                  });
                }}>
                그룹원
              </Item>
              <Item
                icon="EnvelopeSimpleOpen"
                disabled={data.me.role < data.group.invite_policy}
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "InviteGroup",
                    params: {
                      id: data.group.id,
                    },
                  });
                }}>
                초대 코드 관리
              </Item>
              <Item
                icon="PencilSimpleLine"
                disabled={data.me.role !== 2}
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "EditGroup",
                    params: {
                      id: data.group.id,
                    },
                  });
                }}>
                그룹 정보 수정
              </Item>
            </VStack>
            <Confirm
              sheetRef={sheetRef}
              title="그룹 탈퇴"
              description={
                "정말로 그룹에서 탈퇴하시겠습니까?\n모든 학습기록이 삭제됩니다."
              }
              confirmText={"그룹 탈퇴"}
              cancelText="취소"
              onConfirm={quit}
            />
          </VStack>
        )}
      </Wrapper>
    </Container>
  );
};

interface ItemProps {
  children: string;
  icon: PhosphorIconName;
  disabled?: boolean;
  onPress?: () => void;
}
const Item: React.FC<ItemProps> = ({ children, icon, disabled, onPress }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <HStack
        align="center"
        gap={300}
        style={[
          styles.padding.vertical[500],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(disabled ? colors.gray[300] : colors.gray[100]),
        ]}>
        <PhosphorIcon
          name={disabled ? "Lock" : icon}
          color={disabled ? colors.gray[400] : colors.gray[700]}
        />
        <Text
          type="body"
          weight="medium"
          color={disabled ? colors.gray[400] : colors.gray[700]}>
          {children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { ViewGroup };
