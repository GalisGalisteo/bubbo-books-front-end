import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "./src/components/Header";
import { BooksList } from "./src/components/BooksList";
import { AddBook } from "./src/components/AddBook";
import { Footer } from "./src/components/Footer";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={{}}>
        <BooksList fetchBookList={!isModalVisible} />
      </View>

      <View style={styles.footer}>
        <Footer
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <AddBook setIsModalVisible={setIsModalVisible} />
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
