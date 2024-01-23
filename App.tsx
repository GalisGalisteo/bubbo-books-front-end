import { StatusBar } from "expo-status-bar";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "./src/components/Header";
import { BooksList } from "./src/components/BooksList";
import { BookForm } from "./src/components/BookForm";
import { useState } from "react";
import { Overlay } from "./src/components/Overlay";
import { AddBook } from "./src/components/AddBook";
import { Footer } from "./src/components/Footer";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Modal visible={isModalVisible} transparent animationType="slide">
          <AddBook setIsModalVisible={setIsModalVisible} />
        </Modal>
        <View style={styles.list}>
          <BooksList fetchBookList={!isModalVisible} />
        </View>
        <Footer
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
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
  content: {
    backgroundColor: "transparent",
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
