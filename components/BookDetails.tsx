import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Book } from "./BookItem";
import { Fontisto } from "@expo/vector-icons";

interface BookDetailsProps {
  selectedBook: Book | null;
  onClose: () => void;
}

export const BookDetails = ({ selectedBook, onClose }: BookDetailsProps) => {
  // const [bookDetails, setBookDetails] = useState(null);

  if (!selectedBook) {
    return;
  }
  const { id, author, title } = selectedBook;
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onClose}>
        <Fontisto name="close-a" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 40 }}>{title}</Text>
      <Image
        source={{
          uri: "https://www.cwhaydenonline.com/media/wysiwyg/red_button_new_customer.png",
        }}
        style={styles.image}
      />
      <Text>Id: {id}</Text>
      <Text>Author: {author}</Text>
      <Text>Title: {title}</Text>
      <Text>Id: {id}</Text>
      <Text>Author: {author}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    gap: 10,
    padding: 16,
    marginTop: 80,

  },
  image: {
    width: 300,
    height: 300,
  },
  details: {
    fontSize: 20,
  },
});
