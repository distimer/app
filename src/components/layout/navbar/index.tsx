import type { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import type {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import type { PhosphorIconName } from "components/common";
import type { NavbarItem } from "navigations/navbar";
import type React from "react";

import { Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { useTheme } from "contexts/theme";

import { PhosphorIcon, Text } from "components/common";

interface NavbarProps {
  items: NavbarItem[];
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}
const Navbar: React.FC<NavbarProps> = ({ items, state, navigation }) => {
  const { colors, styles } = useTheme();

  return (
    <FlatList
      data={state.routes}
      keyExtractor={(item) => item.key}
      renderItem={({ item, index }) => (
        <NavbarButton
          title={items[index].title}
          icon={items[index].icon}
          selected={state.index === index}
          onPress={() => {
            const event = navigation.emit({
              type: "tabPress",
              target: item.key,
              canPreventDefault: true,
            });

            ReactNativeHapticFeedback.trigger("impactLight", {
              enableVibrateFallback: true,
              ignoreAndroidSystemSettings: false,
            });

            if (!(state.index === index) && !event.defaultPrevented) {
              navigation.navigate(item.name);
            }
          }}
        />
      )}
      numColumns={state.routes.length}
      scrollEnabled={false}
      style={[
        styles.padding.horizontal[300],
        styles.$grow(0),
        styles.$background(colors.gray[0]),
      ]}
    />
  );
};

interface NavbarButtonProps {
  title: string;
  icon: PhosphorIconName;
  selected: boolean;
  onPress: () => void;
}
const NavbarButton: React.FC<NavbarButtonProps> = ({
  title,
  icon,
  selected,
  onPress,
}) => {
  const { colors, styles, insets } = useTheme();

  const color = selected ? colors.gray[700] : colors.gray[500];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.align.center,
        styles.padding.top[300],
        insets.bottom
          ? styles.safePadding.bottom[0]
          : styles.padding.bottom[300],
        styles.gap.all[50],
        styles.$flex(1),
      ]}>
      <PhosphorIcon
        name={icon}
        type={selected ? "fill" : "regular"}
        color={color}
      />
      <Text
        type="footnote"
        weight={selected ? "semiBold" : "medium"}
        color={color}>
        {title}
      </Text>
    </Pressable>
  );
};

export { Navbar };
