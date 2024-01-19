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
        "https://us-central1-bubbo-88234.cloudfunctions.net/app/books",
        { method: "GET" }
      );
      if (res.ok) {
        const response = await res.json();
        setBooks(response.data);
      } else {
        console.error("Error fetching books");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
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
          setSelectedBookId={() => setSelectedBookId(null)}
        />
      </Modal>
    </View>
  );
};
