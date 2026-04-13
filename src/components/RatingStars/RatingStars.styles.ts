import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starButton: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  starText: {
    fontSize: 30,
    color: "#D0D5DD",
  },
  starTextFilled: {
    color: "#F59E0B",
  },
  helperText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#475467",
    fontWeight: "500",
  },
});
