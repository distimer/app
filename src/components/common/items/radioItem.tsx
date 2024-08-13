import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useTheme } from "contexts/theme";

import { Icon } from "../icon";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface RadioItemProps {
  title: string;
  items: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}
const RadioItem: React.FC<RadioItemProps> = ({
  title,
  items,
  selected,
  setSelected,
}) => {
  const { styles, colors, values } = useTheme();

  return (
    <VStack gap={400}>
      <Text type="body" weight="semiBold" color={colors.gray[700]}>
        {title}
      </Text>
      <FlatList
        data={items}
        scrollEnabled={false}
        contentContainerStyle={[
          styles.gap.all[300],
          styles.padding.vertical[400],
          styles.padding.horizontal[600],
          styles.radius.all[400],
          styles.$background(colors.gray[100]),
        ]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(index);
            }}
            hitSlop={values[150]}>
            <HStack align="center" gap={200}>
              <Icon
                name={
                  selected === index
                    ? "RadioButtonOnIcon"
                    : "RadioButtonOffIcon"
                }
                fill={colors.gray[700]}
              />
              <Text type="body" weight="medium" color={colors.gray[700]}>
                {item}
              </Text>
            </HStack>
          </TouchableOpacity>
        )}
      />
    </VStack>
  );
};

export { RadioItem };
