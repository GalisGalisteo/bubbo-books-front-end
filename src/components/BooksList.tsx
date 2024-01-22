import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Book, BookItem, ItemProps } from "./BookItem";
import { BookDetails } from "./BookDetails";
import { fetchBooks } from "../../services";

interface BookListProps {
  fetchBookList: boolean;
}

export const BooksList = ({ fetchBookList }: BookListProps) => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState<null | string>(null);

  const getBooks = async () => {
    try {
      const response = await fetchBooks();
      if (response.ok) {
        const responseData = await response.json();
        setBooks(responseData.data);
        console.log("fetching getBooks");
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
    getBooks();
  }, [selectedBookId, fetchBookList]);

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
          setSelectedBookId={setSelectedBookId}
        />
      </Modal>
    </View>
  );
};
