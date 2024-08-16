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
  EditGroupProfile,
  EditProfile,
  EditStudylog,
  EditSubject,
  EditUser,
  InviteGroup,
  ListUser,
  MyStudylogs,
  Opensource,
  OtherStudylogs,
  Statistics,
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
  EditGroupProfile: {
    id: string;
  };
  ListUser: {
    id: string;
  };
  EditUser: {
    group: string;
    user: string;
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
    id: string;
  };
  MyStudylogs?: {
    group: string;
  };
  OtherStudylogs: {
    group: string;
    user: string;
  };
  EditStudylog: {
    id: string;
    date: string;
  };
  Statistics?: {
    group: string;
    user: string;
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
      <Stack.Screen name="EditGroupProfile" component={EditGroupProfile} />
      <Stack.Screen name="ListUser" component={ListUser} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CategorySubject" component={CategorySubject} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="CreateSubject" component={CreateSubject} />
      <Stack.Screen name="EditSubject" component={EditSubject} />
      <Stack.Screen name="MyStudylogs" component={MyStudylogs} />
      <Stack.Screen name="OtherStudylogs" component={OtherStudylogs} />
      <Stack.Screen name="EditStudylog" component={EditStudylog} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="AppInfo" component={AppInfo} />
      <Stack.Screen name="Opensource" component={Opensource} />
    </Stack.Navigator>
  );
};

export { PagesStack };
export type { PagesStackProps, PagesStackParamList };
