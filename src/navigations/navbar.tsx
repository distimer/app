import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { PhosphorIconName } from "components/common";

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Navbar } from "components/layout";

import { Group, My, Time } from "screens/navbar";

interface NavbarItem {
  name: keyof NavbarStackParamList;
  title: string;
  component: React.FC;
  icon: PhosphorIconName;
}
type NavbarStackParamList = {
  Time: undefined;
  Group: undefined;
  My: undefined;
};
type NavbarStackProps = StackNavigationProp<NavbarStackParamList>;
const Stack = createBottomTabNavigator<NavbarStackParamList>();
const NavbarStack = () => {
  const navbarItems: NavbarItem[] = [
    {
      name: "Time",
      title: "시간",
      component: Time,
      icon: "Timer",
    },
    {
      name: "Group",
      title: "그룹",
      component: Group,
      icon: "Graph",
    },
    {
      name: "My",
      title: "내 정보",
      component: My,
      icon: "User",
    },
  ];

  const renderNavbar = (props: BottomTabBarProps) => (
    <Navbar
      items={navbarItems}
      state={props.state}
      navigation={props.navigation}
    />
  );

  return (
    <Stack.Navigator
      tabBar={renderNavbar}
      screenOptions={{
        headerShown: false,
      }}>
      {navbarItems.map((item) => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export { NavbarStack };
export type { NavbarStackParamList, NavbarStackProps, NavbarItem };
