import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { styles } from "./LoadingState.styles";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Chargement en cours...",
}: LoadingStateProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
