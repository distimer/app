import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AppInfo,
  CategorySubject,
  CreateGroup,
  CreateSubject,
  EditCategory,
  EditGroup,
  EditProfile,
  EditSubject,
  InviteGroup,
  Opensource,
  ViewGroup,
} from "screens/pages";

type PagesStackParamList = {
  ViewGroup: {
    id: string;
  };
  CreateGroup: undefined;
  EditGroup: {
    id: string;
  };
  InviteGroup: {
    id: string;
  };
  EditProfile: undefined;
  CategorySubject: undefined;
  EditCategory: {
    id: string;
  };
  CreateSubject: {
    id: string;
  };
  EditSubject: {
    categoryId: string;
    subjectId: string;
  };
  AppInfo: undefined;
  Opensource: undefined;
};
type PagesStackProps = StackNavigationProp<PagesStackParamList>;
const Stack = createNativeStackNavigator<PagesStackParamList>();
const PagesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ViewGroup" component={ViewGroup} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="EditGroup" component={EditGroup} />
      <Stack.Screen name="InviteGroup" component={InviteGroup} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CategorySubject" component={CategorySubject} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="CreateSubject" component={CreateSubject} />
      <Stack.Screen name="EditSubject" component={EditSubject} />
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="Opensource" component={Opensource} />
    </Stack.Navigator>
  );
};

export { PagesStack };
export type { PagesStackProps, PagesStackParamList };
