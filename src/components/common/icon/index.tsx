import React from "react";

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

export { Icon };
