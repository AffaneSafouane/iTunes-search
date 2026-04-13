import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#101828",
    backgroundColor: "#FFFFFF",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475467",
  },
  toggleTextActive: {
    color: "#101828",
  },
});
