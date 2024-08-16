import type { PhosphorIconName } from "components/common";
import type { Keys } from "styles/styles";

import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useMainNavigation } from "navigations";

import { useTheme } from "contexts/theme";

import {
  Button,
  HStack,
  Icon,
  PhosphorIcon,
  Text,
  VStack,
} from "components/common";

interface ContainerSharedProps {
  title?: string;
  gap?: Keys;
  scrollable?: boolean;
  fixedComponent?: React.ReactNode;
  button?: {
    title: string;
    disabled?: boolean;
    onPress?: () => void;
  };
  trailingIcon?: {
    name: PhosphorIconName;
    color?: string;
    onPress: () => void;
  };
}
interface ContainerProps extends ContainerSharedProps {
  children: React.ReactNode;
  dim?: boolean;
  sheet?: boolean;
  fill?: boolean;
  backable?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  leadingIcon?: {
    name: PhosphorIconName;
    onPress: () => void;
  };
}
const Container: React.FC<ContainerProps> = ({
  children,
  title,
  dim,
  gap = 600,
  backable = false,
  scrollable = false,
  sheet = false,
  fill = true,
  refreshControl,
  leadingIcon,
  trailingIcon,
  fixedComponent,
  button,
}) => {
  const { styles, colors, values } = useTheme();
  const navigation = useMainNavigation();

  return (
    <VStack
      fill={fill}
      style={[
        !sheet && [
          styles.safePadding.top[0],
          styles.$background(dim ? colors.gray[100] : colors.gray[0]),
        ],
        !!button && styles.safePadding.bottom[0],
      ]}>
      <HStack
        align="center"
        justify="between"
        style={[styles.padding.horizontal[800], styles.$height(92)]}>
        {backable || leadingIcon ? (
          <TouchableOpacity
            hitSlop={values[400]}
            onPress={() => {
              if (leadingIcon) {
                leadingIcon.onPress();
              } else {
                navigation.goBack();
              }
            }}>
            <PhosphorIcon
              name={leadingIcon ? leadingIcon.name : "CaretLeft"}
              color={colors.gray[400]}
            />
          </TouchableOpacity>
        ) : (
          <View style={[styles.$width(24), styles.$height(24)]} />
        )}
        {title ? (
          <Text type="title2" weight="semiBold" color={colors.gray[800]}>
            {title}
          </Text>
        ) : (
          <Icon name="HeaderLogoIcon" fill={colors.gray[1000]} />
        )}
        {trailingIcon ? (
          <TouchableOpacity
            hitSlop={values[400]}
            onPress={trailingIcon.onPress}>
            <PhosphorIcon
              name={trailingIcon.name}
              color={trailingIcon.color || colors.gray[400]}
            />
          </TouchableOpacity>
        ) : (
          <View style={[styles.$width(24), styles.$height(24)]} />
        )}
      </HStack>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[fill ? styles.$grow(1) : undefined]}>
        <VStack gap={scrollable ? gap : 800} fill={fill}>
          {!!fixedComponent && (
            <VStack style={[styles.padding.horizontal[600]]}>
              {fixedComponent}
            </VStack>
          )}
          <ScrollView
            scrollEnabled={scrollable}
            showsVerticalScrollIndicator={false}
            refreshControl={
              refreshControl ? (
                <RefreshControl
                  refreshing={refreshControl.refreshing}
                  onRefresh={refreshControl.onRefresh}
                />
              ) : undefined
            }
            contentContainerStyle={[
              styles.gap.all[gap],
              styles.padding.horizontal[600],
              !button &&
                (dim
                  ? styles.padding.bottom[600]
                  : styles.safePadding.bottom[600]),
              styles.$grow(1),
            ]}>
            {children}
          </ScrollView>
          {!!button && (
            <VStack
              style={[
                styles.padding.horizontal[600],
                styles.padding.bottom[600],
              ]}>
              <Button disabled={button.disabled} onPress={button.onPress}>
                {button.title}
              </Button>
            </VStack>
          )}
        </VStack>
      </KeyboardAvoidingView>
    </VStack>
  );
};

export { Container };
export type { ContainerSharedProps };
