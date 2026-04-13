import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import type { SearchAttribute } from "../../types";

import { styles } from "./SearchBar.styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  searchAttribute: SearchAttribute;
  onChangeSearchAttribute: (attribute: SearchAttribute) => void;
  placeholder?: string;
}

const SEARCH_MODES: ReadonlyArray<{
  value: SearchAttribute;
  label: string;
}> = [
  { value: "artistTerm", label: "Artiste" },
  { value: "songTerm", label: "Titre" },
];

export const SearchBar = ({
  value,
  onChangeText,
  searchAttribute,
  onChangeSearchAttribute,
  placeholder = "Rechercher une musique...",
}: SearchBarProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#98A2B3"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />

      <View style={styles.toggleContainer}>
        {SEARCH_MODES.map((mode) => {
          const isActive = searchAttribute === mode.value;

          return (
            <Pressable
              key={mode.value}
              onPress={() => onChangeSearchAttribute(mode.value)}
              style={[styles.toggleButton, isActive && styles.toggleButtonActive]}
            >
              <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>
                {mode.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
