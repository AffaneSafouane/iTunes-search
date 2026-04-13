import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { fetchITunesTracks, mapITunesTracksToTracks } from "../../api";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  SearchBar,
  TrackListItem,
} from "../../components";
import type { RootStackParamList, SearchAttribute, Track } from "../../types";

import { styles } from "./SearchScreen.styles";

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export const SearchScreen = (): React.JSX.Element => {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchAttribute, setSearchAttribute] = useState<SearchAttribute>("artistTerm");
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchITunesTracks({
        term: searchValue,
        attribute: searchAttribute,
        limit: 25,
      });

      const mappedResults = mapITunesTracksToTracks(response.results);
      setResults(mappedResults);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur s'est produite lors de la recherche";
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, searchAttribute]);

  const handleTrackPress = (track: Track): void => {
    navigation.navigate("TrackDetail", { track });
  };

  const renderEmptyOrError = (): React.JSX.Element | null => {
    if (error) {
      return <ErrorState message="Erreur de recherche" details={error} onRetry={handleSearch} />;
    }

    if (searchValue.trim() && !isLoading && results.length === 0) {
      return <EmptyState message="Aucun résultat trouvé pour cette recherche" />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            searchAttribute={searchAttribute}
            onChangeSearchAttribute={setSearchAttribute}
            placeholder="Rechercher une musique..."
          />
        </View>

        {isLoading ? (
          <LoadingState message="Recherche en cours..." />
        ) : (
          <FlatList
            data={results}
            renderItem={({ item }) => <TrackListItem track={item} onPress={handleTrackPress} />}
            keyExtractor={(item) => String(item.trackId)}
            scrollEnabled={results.length > 0}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyOrError()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
