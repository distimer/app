/* eslint-disable import/namespace */
import React from "react";

import * as PhosphorIcons from "phosphor-react-native";

import * as Icons from "assets/icons";

export type IconName = keyof typeof Icons;
interface IconProps {
  name: IconName;
  fill?: string;
}
const Icon = React.memo(({ name, fill }: IconProps) => {
  const IconComponent = Icons[name] as React.ElementType;
  return <IconComponent fill={fill || "none"} />;
});

export type PhosphorIconName = keyof typeof PhosphorIcons;
interface PhosphorIconProps {
  name: PhosphorIconName;
  type?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  size?: number;
  color?: string;
}
const PhosphorIcon = React.memo(
  ({ name, type = "bold", size, color }: PhosphorIconProps) => {
    const IconComponent = PhosphorIcons[name] as React.ElementType;
    return (
      <IconComponent weight={type} size={size || 24} color={color || "none"} />
    );
  },
);

export { Icon, PhosphorIcon };
