import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Book, BookItem, ItemProps } from "./BookItem";
import { BookDetails } from "./BookDetails";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState<null | Book>(null);

  const fetchBooks = () => {
    fetch("https://us-central1-bubbo-88234.cloudfunctions.net/app/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const pressHandler = (item: Book) => {
    setSelectedBook(item);
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
      <Modal visible={selectedBook !== null}>
        <BookDetails
          selectedBook={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      </Modal>
    </View>
  );
};
