import React, { useCallback, useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  addFavorite,
  getRatingByTrackId,
  isFavorite,
  removeFavorite,
  setRating,
} from "../../storage";
import { RatingStars, TrackHeaderCard } from "../../components";
import type { RootStackParamList, RatingValue } from "../../types";

import { styles } from "./TrackDetailScreen.styles";

type TrackDetailScreenProps = NativeStackScreenProps<RootStackParamList, "TrackDetail">;

export const TrackDetailScreen = ({ route }: TrackDetailScreenProps): React.JSX.Element => {
  const { track } = route.params;

  const [isFav, setIsFav] = useState<boolean>(false);
  const [currentRating, setCurrentRating] = useState<RatingValue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Charger état favori et note au montage
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const favStatus = await isFavorite(track.trackId);
        setIsFav(favStatus);

        const ratingData = await getRatingByTrackId(track.trackId);
        setCurrentRating(ratingData?.rating ?? null);
      } catch (error: unknown) {
        console.error("Error loading track data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [track.trackId]);

  const handleToggleFavorite = useCallback(async () => {
    try {
      if (isFav) {
        await removeFavorite(track.trackId);
        setIsFav(false);
      } else {
        await addFavorite(track);
        setIsFav(true);
      }
    } catch (error: unknown) {
      console.error("Error toggling favorite:", error);
    }
  }, [isFav, track]);

  const handleRatingChange = useCallback(
    async (rating: RatingValue) => {
      try {
        await setRating(track.trackId, rating);
        setCurrentRating(rating);
      } catch (error: unknown) {
        console.error("Error setting rating:", error);
      }
    },
    [track.trackId],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <TrackHeaderCard track={track} />
        </View>

        <View style={styles.actionContainer}>
          <Pressable
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFav ? styles.favoriteButtonActive : styles.favoriteButtonInactive,
            ]}
          >
            <Text
              style={[
                styles.favoriteButtonText,
                isFav ? styles.favoriteButtonTextActive : styles.favoriteButtonTextInactive,
              ]}
            >
              {isFav ? "★ En favoris" : "+ Ajouter aux favoris"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>Votre note</Text>
          <View style={styles.ratingContainer}>
            <RatingStars value={currentRating} onChange={handleRatingChange} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
