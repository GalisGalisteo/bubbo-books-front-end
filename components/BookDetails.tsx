import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Book } from "./BookItem";
import { Fontisto } from "@expo/vector-icons";
import { BookForm } from "./BookForm";

export interface BookDetails {
  id?: string;
  author: string;
  title: string;
  summary: string;
  yearPublished: string;
  genre: string;
  isbn: string;
  image?: string;
}

interface BookDetailsProps {
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const BookDetails = ({
  selectedBookId,
  setSelectedBookId,
}: BookDetailsProps) => {
  const [bookDetails, setBookDetails] = useState<null | BookDetails>(null);
  const [editable, setEditable] = useState(false);

  const fetchBookDetails = async (id: string | null) => {
    try {
      const response = await fetch(
        `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
        { method: "GET" }
      );
      if (response.ok) {
        const responseData = await response.json();
        setBookDetails(responseData.data);
        console.log("fetching fetchBookDetails");
      } else {
        console.error("Error fetching book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  const handleDeleteBook = async (id: string | null) => {
    try {
      const response = await fetch(
        `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log("fetching handleDeleteBook");
      } else {
        console.error("Error deleting book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
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

  const { id, author, title, summary, yearPublished, genre, isbn, image } =
    bookDetails;

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setSelectedBookId(null)}>
        <Fontisto name="close-a" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 40 }}>{title}</Text>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <BookForm
        bookDetails={{
          id,
          author,
          title,
          summary,
          yearPublished,
          genre,
          isbn,
        }}
        isEditable={editable}
        setIsEditable={setEditable}
      />

      {!editable ? (
        <View style={{ flexDirection: "row" }}>
          <Button title="Edit" onPress={() => setEditable(true)} />
          <Button
            title="Delete"
            onPress={() => {
              Alert.alert("Deleting Book", "Are you sure you want to delete?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    await handleDeleteBook(selectedBookId);
                    setSelectedBookId(null);
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                  onPress: () => {
                    console.log("delete cancelled");
                  },
                },
              ]);
            }}
          />
        </View>
      ) : null}
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
});
