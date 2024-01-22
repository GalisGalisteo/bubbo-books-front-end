import { StatusBar } from "expo-status-bar";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header";
import { BooksList } from "./src/components/BooksList";
import { BookForm } from "./src/components/BookForm";
import { useState } from "react";
import { Overlay } from "./src/components/Overlay";
import { AddBook } from "./src/components/AddBook";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <Button
        title="Add Book"
        onPress={() => {
          setIsModalVisible(true);
        }}
      />
      <Modal visible={isModalVisible} transparent animationType="slide">
        <AddBook setIsModalVisible={setIsModalVisible} />
      </Modal>
      <View>
        <BooksList fetchBookList={!isModalVisible} />
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
