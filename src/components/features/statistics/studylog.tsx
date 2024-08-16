import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { diffConsume, timestamp } from "utils/func";

import { HStack, PhosphorIcon, Text, VStack } from "components/common";

interface StudylogProps {
  category: string;
  subject: string;
  color: string;
  content: string;
  target: string;
  start: string;
  end: string;
  shared?: boolean;
  onPress?: () => void;
}
const Studylog: React.FC<StudylogProps> = ({
  category,
  subject,
  color,
  content,
  target,
  start,
  end,
  shared,
  onPress,
}) => {
  const { styles, colors, values } = useTheme();

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <HStack align="center" gap={400}>
        <VStack
          self="stretch"
          style={[
            styles.radius.all[100],
            styles.$width(values[200]),
            styles.$background(color),
          ]}
        />
        <VStack gap={100} fill style={[styles.padding.vertical[100]]}>
          <HStack align="center" justify="between" fill>
            <HStack align="center" gap={200} fill>
              <Text type="body" weight="semiBold" color={colors.gray[700]}>
                {subject}
              </Text>
              <Text type="subheadline" weight="medium" color={colors.gray[400]}>
                {category}
              </Text>
            </HStack>
            {shared !== undefined && (
              <PhosphorIcon
                name={shared ? "ShareNetwork" : "LockSimple"}
                size={20}
                color={shared ? colors.gray[700] : colors.gray[400]}
              />
            )}
          </HStack>
          <Text type="subheadline" weight="medium" color={colors.gray[700]}>
            {content}
          </Text>
          <HStack justify="between">
            <Text type="subheadline" weight="medium" color={colors.gray[400]}>
              {timestamp(target, start)}
              {" ~ "}
              {timestamp(target, end)}
            </Text>
            <Text type="subheadline" weight="medium" color={colors.gray[400]}>
              {diffConsume(start, end)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export { Studylog };
