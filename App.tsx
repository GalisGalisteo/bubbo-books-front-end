import { StatusBar } from "expo-status-bar";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { BooksList } from "./components/BooksList";
import { BookForm } from "./components/BookForm";
import { useState } from "react";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <Button
        title="Add Book"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <Modal visible={isModalVisible}>
        <BookForm bookDetails={null} isEditable={true} setIsEditable={null} />
      </Modal>
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
