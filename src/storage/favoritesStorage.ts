import AsyncStorage from "@react-native-async-storage/async-storage";

import type { FavoriteTrack, FavoritesRecord, Track } from "../types";

const FAVORITES_STORAGE_KEY = "@itunes:favorites";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const isTrack = (value: unknown): value is Track => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.trackId === "number" &&
    typeof value.trackName === "string" &&
    typeof value.artistName === "string" &&
    typeof value.artworkUrl100 === "string"
  );
};

const isFavoriteTrack = (value: unknown): value is FavoriteTrack => {
  if (!isObject(value)) {
    return false;
  }

  return typeof value.addedAt === "string" && isTrack(value.track);
};

const isFavoritesRecord = (value: unknown): value is FavoritesRecord => {
  if (!isObject(value)) {
    return false;
  }

  return Object.values(value).every((entry) => isFavoriteTrack(entry));
};

const parseFavoritesRecord = (raw: string | null): FavoritesRecord => {
  if (!raw) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isFavoritesRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const persistFavorites = async (favorites: FavoritesRecord): Promise<void> => {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

export const getFavorites = async (): Promise<FavoritesRecord> => {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return parseFavoritesRecord(raw);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to read favorites: ${error.message}`);
    }

    throw new Error("Unable to read favorites due to an unknown storage error");
  }
};

export const addFavorite = async (track: Track): Promise<FavoritesRecord> => {
  const favorites = await getFavorites();

  favorites[String(track.trackId)] = {
    track,
    addedAt: new Date().toISOString(),
  };

  try {
    await persistFavorites(favorites);
    return favorites;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to save favorite: ${error.message}`);
    }

    throw new Error("Unable to save favorite due to an unknown storage error");
  }
};

export const removeFavorite = async (trackId: number): Promise<FavoritesRecord> => {
  const favorites = await getFavorites();

  delete favorites[String(trackId)];

  try {
    await persistFavorites(favorites);
    return favorites;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to remove favorite: ${error.message}`);
    }

    throw new Error("Unable to remove favorite due to an unknown storage error");
  }
};

export const isFavorite = async (trackId: number): Promise<boolean> => {
  const favorites = await getFavorites();
  return String(trackId) in favorites;
};

export const clearFavorites = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to clear favorites: ${error.message}`);
    }

    throw new Error("Unable to clear favorites due to an unknown storage error");
  }
};
