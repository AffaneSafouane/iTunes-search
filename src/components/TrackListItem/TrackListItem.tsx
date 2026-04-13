import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import type { Track } from "../../types";

import { styles } from "./TrackListItem.styles";

interface TrackListItemProps {
  track: Track;
  onPress: (track: Track) => void;
}

export const TrackListItem = ({ track, onPress }: TrackListItemProps): React.JSX.Element => {
  return (
    <Pressable onPress={() => onPress(track)} style={styles.pressable}>
      <View style={styles.content}>
        <Image source={{ uri: track.artworkUrl100 }} style={styles.artwork} resizeMode="cover" />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.trackName}>
            {track.trackName}
          </Text>
          <Text numberOfLines={1} style={styles.artistName}>
            {track.artistName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
