import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerSection: {
    marginBottom: 24,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    alignItems: "center",
  },
  favoriteButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#EF4444",
  },
  favoriteButtonInactive: {
    backgroundColor: "#F2F4F7",
    borderWidth: 1,
    borderColor: "#D0D5DD",
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  favoriteButtonTextActive: {
    color: "#FFFFFF",
  },
  favoriteButtonTextInactive: {
    color: "#101828",
  },
  ratingSection: {
    marginTop: 24,
    gap: 12,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#101828",
  },
  ratingContainer: {
    paddingVertical: 8,
  },
});
