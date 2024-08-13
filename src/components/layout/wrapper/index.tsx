import React from "react";
import { ActivityIndicator } from "react-native";

import { VStack } from "components/common";

interface WrapperProps<T> {
  data: T | undefined;
  children: (data: T) => React.ReactNode;
  skeleton?: React.ReactNode;
  empty?: React.ReactNode;
}
const Wrapper = <T,>({ data, children, skeleton, empty }: WrapperProps<T>) => {
  if (data === undefined)
    return (
      skeleton || (
        <VStack align="center" justify="center" fill>
          <ActivityIndicator />
        </VStack>
      )
    );
  if (empty && data && !(data as T[]).length) return empty;
  return children(data);
};

export { Wrapper };
