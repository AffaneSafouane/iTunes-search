import React from "react";
import { Text, View } from "react-native";

import { styles } from "./EmptyState.styles";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({
  message = "Aucun résultat trouvé",
}: EmptyStateProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎵</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
