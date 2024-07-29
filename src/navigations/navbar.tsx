import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

import { Navbar } from "components/layout";
import { Group, My, Time } from "screens/navbar";

interface NavbarItem {
  name: keyof NavbarStackParamList;
  title: string;
  component: React.FC;
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
    },
    {
      name: "Group",
      title: "그룹",
      component: Group,
    },
    {
      name: "My",
      title: "내 정보",
      component: My,
    },
  ];

  return (
    <Stack.Navigator
      tabBar={(props) => (
        <Navbar
          items={navbarItems}
          state={props.state}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
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
