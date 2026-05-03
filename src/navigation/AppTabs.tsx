import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { SearchScreen, FavoritesScreen } from "../screens";
import type { AppTabParamList } from "../types";

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppTabs = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f63b3b",
        tabBarInactiveTintColor: "#98A2B3",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#EAECF0",
          paddingBottom: 4,
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Recherche",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="search" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favoris",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="favorite" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
