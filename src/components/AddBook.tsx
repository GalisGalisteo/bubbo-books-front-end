import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Overlay } from "./Overlay";
import { BookForm } from "./BookForm";
import { Fontisto } from "@expo/vector-icons";
import { UploadImage } from "./UploadImage";
import { useState } from "react";

interface AddBookProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBook = ({ setIsModalVisible }: AddBookProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Overlay onPress={() => setIsModalVisible(false)} />
        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
          <Fontisto name="close-a" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.bookFormContainer}>
          <BookForm
            bookDetails={null}
            isEditable={true}
            setIsEditable={null}
            setIsModalVisible={setIsModalVisible}
            // uploadedImage={uploadedImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bookFormContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});
