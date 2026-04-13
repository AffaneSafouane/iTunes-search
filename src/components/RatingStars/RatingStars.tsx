import React from "react";
import { Pressable, Text, View } from "react-native";

import type { RatingValue } from "../../types";

import { styles } from "./RatingStars.styles";

interface RatingStarsProps {
  value: RatingValue | null;
  onChange: (rating: RatingValue) => void;
  maxStars?: 5;
  disabled?: boolean;
}

const STAR_VALUES: ReadonlyArray<RatingValue> = [1, 2, 3, 4, 5];

export const RatingStars = ({
  value,
  onChange,
  maxStars = 5,
  disabled = false,
}: RatingStarsProps): React.JSX.Element => {
  const visibleStars = STAR_VALUES.slice(0, maxStars);

  return (
    <View style={styles.container}>
      {visibleStars.map((star) => {
        const filled = value !== null && star <= value;

        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            style={styles.starButton}
            disabled={disabled}
          >
            <Text style={[styles.starText, filled && styles.starTextFilled]}>★</Text>
          </Pressable>
        );
      })}

      <Text style={styles.helperText}>{value ? `${value}/5` : "Non noté"}</Text>
    </View>
  );
};
