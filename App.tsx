import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { BooksList } from "./components/BooksList";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <BooksList />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
