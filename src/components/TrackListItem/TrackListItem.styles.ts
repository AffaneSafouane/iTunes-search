import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pressable: {
    borderWidth: 1,
    borderColor: "#EAECF0",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  artwork: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#F2F4F7",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#101828",
  },
  artistName: {
    fontSize: 14,
    color: "#475467",
    fontWeight: "500",
  },
});
