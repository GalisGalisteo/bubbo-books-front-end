import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Bubbo books</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    paddingTop: 70,
    backgroundColor: "#00D3B0",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
