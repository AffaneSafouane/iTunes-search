import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 20,
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: "#F2F4F7",
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  trackName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#101828",
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475467",
    textAlign: "center",
  },
  collectionName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667085",
    textAlign: "center",
    fontStyle: "italic",
  },
  genre: {
    fontSize: 13,
    color: "#98A2B3",
    textAlign: "center",
    marginTop: 8,
  },
});
