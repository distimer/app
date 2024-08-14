import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";

import { useTheme } from "contexts/theme";

import { filterUnclassifiedCategories } from "utils/func";

import { Empty, HStack, PhosphorIcon, Text, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { CreateCategory } from "screens/sheets";

const CategorySubject = () => {
  const { styles, colors, values } = useTheme();

  const navigation = useMainNavigation();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch, isRefetching } = useGetCategory();
  const filteredData = React.useMemo(() => {
    if (!data) return undefined;
    return filterUnclassifiedCategories(data);
  }, [data]);

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
      title="나의 카테고리 / 과목"
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}
      button={{
        title: "카테고리 추가",
        onPress: () => sheetRef.current?.present(),
      }}>
      <Wrapper
        data={filteredData}
        empty={
          <VStack justify="center" fill>
            <Empty>카테고리 / 과목이 없습니다.</Empty>
          </VStack>
        }>
        {(data) => (
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={[styles.gap.all[300]]}
            renderItem={({ item }) => (
              <VStack gap={200}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PagesStack", {
                      screen: "EditCategory",
                      params: {
                        id: item.id,
                      },
                    });
                  }}>
                  <HStack
                    align="center"
                    justify="between"
                    style={[
                      styles.padding.vertical[200],
                      styles.padding.left[600],
                      styles.padding.right[400],
                      styles.radius.all[400],
                      styles.$background(colors.gray[100]),
                    ]}>
                    <Text
                      type="subheadline"
                      weight="semiBold"
                      color={colors.gray[800]}>
                      {item.name}
                    </Text>
                    <PhosphorIcon name="NotePencil" color={colors.gray[400]} />
                  </HStack>
                </TouchableOpacity>
                <VStack>
                  <FlatList
                    data={item.subjects}
                    scrollEnabled={false}
                    renderItem={({ item: subject }) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("PagesStack", {
                            screen: "EditSubject",
                            params: {
                              id: subject.id,
                            },
                          });
                        }}>
                        <HStack
                          align="center"
                          justify="between"
                          style={styles.padding.all[400]}>
                          <HStack align="center" gap={300}>
                            <VStack
                              style={[
                                styles.radius.all[200],
                                styles.$width(values[400]),
                                styles.$height(values[400]),
                                styles.$background(subject.color),
                              ]}
                            />
                            <Text
                              type="body"
                              weight="medium"
                              color={colors.gray[700]}>
                              {subject.name}
                            </Text>
                          </HStack>
                          <PhosphorIcon
                            name="Faders"
                            color={colors.gray[400]}
                          />
                        </HStack>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("PagesStack", {
                        screen: "CreateSubject",
                        params: {
                          id: item.id,
                        },
                      });
                    }}>
                    <HStack
                      align="center"
                      gap={200}
                      style={[styles.padding.all[400]]}>
                      <PhosphorIcon name="Plus" color={colors.gray[400]} />
                      <Text
                        type="body"
                        weight="medium"
                        color={colors.gray[400]}>
                        과목 추가
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </VStack>
            )}
          />
        )}
      </Wrapper>
      <CreateCategory sheetRef={sheetRef} />
    </Container>
  );
};

export { CategorySubject };
