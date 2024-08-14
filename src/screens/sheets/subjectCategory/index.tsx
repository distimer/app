import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useGetCategory } from "api/endpoints/category/category";

import { useTheme } from "contexts/theme";

import { filterUnclassifiedCategories } from "utils/func";

import { HStack, Icon, SheetContainer, Text } from "components/common";
import { Wrapper } from "components/layout";

interface SubjectCategoryProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  initial?: string;
  onSubmit: (category: string) => void;
}
const SubjectCategory: React.FC<SubjectCategoryProps> = ({
  sheetRef,
  initial = "",
  onSubmit,
}) => {
  const { styles } = useTheme();

  const [category, setCategory] = React.useState(initial);

  React.useEffect(() => {
    setCategory(initial);
  }, [initial]);

  const { data } = useGetCategory();

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="카테고리 선택"
      fixed
      scrollable
      onDismiss={() => {
        setCategory(initial);
      }}
      button={{
        title: "선택하기",
        onPress: () => {
          onSubmit(category);
        },
      }}>
      <Wrapper data={data}>
        {(data) => (
          <FlatList
            data={filterUnclassifiedCategories(data)}
            scrollEnabled={false}
            contentContainerStyle={[styles.gap.all[300]]}
            renderItem={({ item }) => (
              <Item
                selected={category === item.id}
                onPress={() => {
                  setCategory(item.id);
                }}>
                {item.name}
              </Item>
            )}
          />
        )}
      </Wrapper>
    </SheetContainer>
  );
};

interface ItemProps {
  children: string;
  selected: boolean;
  onPress: () => void;
}
const Item: React.FC<ItemProps> = ({ children, selected, onPress }) => {
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
          styles.$background(colors.gray[100]),
        ]}>
        <Icon
          name={selected ? "RadioButtonOnIcon" : "RadioButtonOffIcon"}
          fill={colors.gray[700]}
        />
        <Text type="body" weight="medium" color={colors.gray[700]}>
          {children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { SubjectCategory };
