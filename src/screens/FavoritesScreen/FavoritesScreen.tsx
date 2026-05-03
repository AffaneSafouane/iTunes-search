import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getFavorites } from "../../storage";
import { EmptyState, ErrorState, LoadingState, TrackListItem } from "../../components";
import type { FavoritesRecord, RootStackParamList, Track } from "../../types";

import { styles } from "./FavoritesScreen.styles";

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export const FavoritesScreen = (): React.JSX.Element => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const [favorites, setFavorites] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const favoritesRecord: FavoritesRecord = await getFavorites();
      const favoritesList: Track[] = Object.values(favoritesRecord).map((fav) => fav.track);

      setFavorites(favoritesList);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors du chargement des favoris";
      setError(errorMessage);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Recharger les favoris chaque fois que l'écran est affiché
  useFocusEffect(
    useCallback((): void => {
      // Exécute la fonction asynchrone
      loadFavorites();
    }, [loadFavorites]),
  );

  const handleTrackPress = (track: Track): void => {
    navigation.navigate("TrackDetail", { track });
  };

  const renderEmptyOrError = (): React.JSX.Element | null => {
    if (error) {
      return (
        <ErrorState
          message="Erreur lors du chargement"
          details={error}
          onRetry={loadFavorites}
        />
      );
    }

    if (favorites.length === 0 && !isLoading) {
      return <EmptyState message="Vous n'avez pas encore de favoris" />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <LoadingState message="Chargement des favoris..." />
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => <TrackListItem track={item} onPress={handleTrackPress} />}
            keyExtractor={(item) => String(item.trackId)}
            scrollEnabled={favorites.length > 0}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyOrError()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
