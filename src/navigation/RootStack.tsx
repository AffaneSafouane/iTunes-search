import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TrackDetailScreen } from "../screens";
import type { RootStackParamList } from "../types";
import { AppTabs } from "./AppTabs";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#101828",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#101828",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{
          title: "Détails",
        }}
      />
    </Stack.Navigator>
  );
};
