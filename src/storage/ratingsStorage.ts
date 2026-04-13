import AsyncStorage from "@react-native-async-storage/async-storage";

import type { RatingValue, RatingsRecord, TrackRating } from "../types";

const RATINGS_STORAGE_KEY = "@itunes:ratings";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const isRatingValue = (value: unknown): value is RatingValue => {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
};

const isTrackRating = (value: unknown): value is TrackRating => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.trackId === "number" &&
    isRatingValue(value.rating) &&
    typeof value.updatedAt === "string"
  );
};

const isRatingsRecord = (value: unknown): value is RatingsRecord => {
  if (!isObject(value)) {
    return false;
  }

  return Object.values(value).every((entry) => isTrackRating(entry));
};

const parseRatingsRecord = (raw: string | null): RatingsRecord => {
  if (!raw) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isRatingsRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const persistRatings = async (ratings: RatingsRecord): Promise<void> => {
  await AsyncStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
};

export const getRatings = async (): Promise<RatingsRecord> => {
  try {
    const raw = await AsyncStorage.getItem(RATINGS_STORAGE_KEY);
    return parseRatingsRecord(raw);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to read ratings: ${error.message}`);
    }

    throw new Error("Unable to read ratings due to an unknown storage error");
  }
};

export const setRating = async (
  trackId: number,
  rating: RatingValue,
): Promise<RatingsRecord> => {
  const ratings = await getRatings();

  ratings[String(trackId)] = {
    trackId,
    rating,
    updatedAt: new Date().toISOString(),
  };

  try {
    await persistRatings(ratings);
    return ratings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to save rating: ${error.message}`);
    }

    throw new Error("Unable to save rating due to an unknown storage error");
  }
};

export const removeRating = async (trackId: number): Promise<RatingsRecord> => {
  const ratings = await getRatings();

  delete ratings[String(trackId)];

  try {
    await persistRatings(ratings);
    return ratings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to remove rating: ${error.message}`);
    }

    throw new Error("Unable to remove rating due to an unknown storage error");
  }
};

export const getRatingByTrackId = async (
  trackId: number,
): Promise<TrackRating | undefined> => {
  const ratings = await getRatings();
  return ratings[String(trackId)];
};

export const clearRatings = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RATINGS_STORAGE_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to clear ratings: ${error.message}`);
    }

    throw new Error("Unable to clear ratings due to an unknown storage error");
  }
};
