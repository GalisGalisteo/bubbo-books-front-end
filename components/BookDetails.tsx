import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Book } from "./BookItem";
import { Fontisto } from "@expo/vector-icons";

interface BookDetailsProps {
  selectedBookId: string | null;
  onClose: () => void;
}

export const BookDetails = ({ selectedBookId, onClose }: BookDetailsProps) => {
  const [bookDetails, setBookDetails] = useState<null | Book>(null);

  const fetchBookDetails = async (id: string) => {
    try {
      const res = await fetch(
        `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data: Book = await res.json();
      setBookDetails(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (selectedBookId) {
      fetchBookDetails(selectedBookId);
    }
  }, [selectedBookId]);

  if (!bookDetails) {
    return;
  }

  const { id, author, title } = bookDetails;

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
