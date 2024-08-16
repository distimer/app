import type { PhosphorIconName } from "components/common";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useMainNavigation } from "navigations";

import { useGetUser } from "api/endpoints/user/user";

import { useAuth } from "contexts/auth";
import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import {
  HStack,
  PhosphorIcon,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "components/common";
import { Container, Wrapper } from "components/layout";

import { Item } from "./item";

const My: React.FC = () => {
  const { styles, colors } = useTheme();
  const { logout } = useAuth();
  const { startLoading, endLoading } = useLoading();
  const navigation = useMainNavigation();

  const { data, refetch, isRefetching } = useGetUser();

  const items: {
    name: string;
    icon: PhosphorIconName;
    onPress?: () => void;
  }[] = [
    {
      name: "나의 학습기록",
      icon: "ListChecks",
      onPress: () => {
        navigation.navigate("PagesStack", { screen: "MyStudylogs" });
      },
    },
    {
      name: "나의 학습통계",
      icon: "ChartBar",
      onPress: () => {
        navigation.navigate("PagesStack", { screen: "Statistics" });
      },
    },
    {
      name: "나의 카테고리 / 과목",
      icon: "Folders",
      onPress: () => {
        navigation.navigate("PagesStack", { screen: "CategorySubject" });
      },
    },
    {
      name: "앱 정보",
      icon: "Info",
      onPress: () => {
        navigation.navigate("PagesStack", { screen: "AppInfo" });
      },
    },
  ];

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetching) return;
    setRefreshing(isRefetching);
  }, [isRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  return (
    <Container
      dim
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PagesStack", { screen: "EditProfile" })
        }>
        <HStack
          align="center"
          justify="between"
          style={[
            styles.padding.vertical[500],
            styles.padding.horizontal[600],
            styles.radius.all[500],
            styles.$background(colors.gray[0]),
          ]}>
          <Wrapper
            data={data}
            skeleton={
              <Skeleton color={colors.gray[100]}>
                <VStack gap={100}>
                  <SkeletonText width={80} type="title3" weight="semiBold" />
                  <SkeletonText
                    width={160}
                    type="subheadline"
                    weight="medium"
                  />
                </VStack>
              </Skeleton>
            }>
            {(data) => (
              <VStack gap={100}>
                <Text type="title3" weight="semiBold" color={colors.gray[800]}>
                  {data.name}
                </Text>
                <Text
                  type="subheadline"
                  weight="medium"
                  color={colors.gray[400]}>
                  {
                    ["Apple로 로그인됨", "Google 계정으로 로그인됨"][
                      data.oauth_provider
                    ]
                  }
                </Text>
              </VStack>
            )}
          </Wrapper>
          <PhosphorIcon
            name="PencilSimpleLine"
            size={20}
            color={colors.gray[400]}
          />
        </HStack>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item icon={item.icon} onPress={item.onPress}>
            {item.name}
          </Item>
        )}
        scrollEnabled={false}
        style={styles.$grow(0)}
        contentContainerStyle={styles.gap.all[300]}
      />
      <Item
        icon="SignOut"
        color={colors.solid.red}
        onPress={async () => {
          startLoading();
          await logout();
          endLoading();
        }}>
        로그아웃
      </Item>
    </Container>
  );
};

export { My };
