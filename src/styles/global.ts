import { StyleSheet } from "react-native";

export const modalsBookStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  bookFormContainer: {
    padding: 20,
    borderRadius: 10,
    width: "85%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
