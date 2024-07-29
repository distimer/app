import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { Navigation } from "navigations";

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export { App };
