import type { InputProps } from "../input";

import React from "react";

import { useTheme } from "contexts/theme";

import { PhosphorIcon, type PhosphorIconName } from "../icon";
import { Input } from "../input";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface InputItemProps extends InputProps {
  title: string;
  icon: PhosphorIconName;
  range?: {
    min: number;
    max: number;
    pass: boolean;
    setPass: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
const InputItem: React.FC<InputItemProps> = ({
  title,
  icon,
  range,
  value,
  setValue,
  ...props
}) => {
  const { colors, styles } = useTheme();

  React.useEffect(() => {
    if (range) {
      if (value !== undefined) {
        range.setPass(value.length >= range.min && value.length <= range.max);
      }
    }
  }, [value, range]);

  return (
    <HStack align="center" gap={500} style={[styles.padding.left[200]]}>
      <PhosphorIcon name={icon} color={colors.gray[700]} />
      <VStack gap={200} fill>
        <HStack align="center" justify="between">
          <Text type="body" weight="semiBold" color={colors.gray[700]}>
            {title}
          </Text>
          {range && (
            <HStack align="center" gap={100}>
              <Text
                type="subheadline"
                weight="medium"
                color={range.pass ? colors.solid.green : colors.gray[500]}>
                {range.min}~{range.max}글자
              </Text>
              <PhosphorIcon
                name="Check"
                size={16}
                color={range.pass ? colors.solid.green : colors.gray[500]}
              />
            </HStack>
          )}
        </HStack>
        <Input size="small" value={value} setValue={setValue} {...props} />
      </VStack>
    </HStack>
  );
};

export { InputItem };
