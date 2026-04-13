import React from "react";
import { Pressable, Text, View } from "react-native";

import { styles } from "./ErrorState.styles";

interface ErrorStateProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Une erreur s'est produite",
  details = "Veuillez vérifier votre connexion Internet",
  onRetry,
}: ErrorStateProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{message}</Text>

      {details && <Text style={styles.detailsText}>{details}</Text>}

      {onRetry && (
        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </Pressable>
      )}
    </View>
  );
};
