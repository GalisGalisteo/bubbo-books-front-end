import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Book, BookItem, ItemProps } from "./BookItem";
import { BookDetails } from "./BookDetails";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState<null | string>(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch(
        "https://us-central1-bubbo-88234.cloudfunctions.net/app/books"
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const pressHandler = (id: string) => {
    setSelectedBookId(id);
  };

  useEffect(() => {
    fetchBooks();
  });
  return (
    <View>
      <View>
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookItem item={item} pressHandler={pressHandler} />
          )}
        />
      </View>
      <Modal visible={selectedBookId !== null}>
        <BookDetails
          selectedBookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      </Modal>
    </View>
  );
};
