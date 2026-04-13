import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootStack } from "./src/navigation";

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
