import React from "react";
import { Image, Text, View } from "react-native";

import type { Track } from "../../types";

import { styles } from "./TrackHeaderCard.styles";

interface TrackHeaderCardProps {
  track: Track;
}

export const TrackHeaderCard = ({ track }: TrackHeaderCardProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: track.artworkUrl1000 }}
        style={styles.artwork}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.trackName}>{track.trackName}</Text>

        <Text style={styles.artistName}>{track.artistName}</Text>

        {track.collectionName && <Text style={styles.collectionName}>{track.collectionName}</Text>}

        {track.primaryGenreName && <Text style={styles.genre}>{track.primaryGenreName}</Text>}
      </View>
    </View>
  );
};
