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

interface BookDetailsProps {
  selectedBookId: string | null;
  onClose: () => void;
  setSelectedBookId: () => void;
}

export const BookDetails = ({
  selectedBookId,
  onClose,
  setSelectedBookId,
}: BookDetailsProps) => {
  const [bookDetails, setBookDetails] = useState<null | Book>(null);
  const [editable, setEditable] = useState(true);

  const fetchBookDetails = async (id: string | null) => {
    try {
      const res = await fetch(
        `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
        { method: "GET" }
      );
      if (res.ok) {
        const response = await res.json();
        setBookDetails(response.data);
      } else {
        console.error("Error fetching book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  const handleDeleteBook = async (id: string | null) => {
    try {
      const res = await fetch(
        `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        const response = await res.json();
        console.log(response);
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
      <TextInput 
      editable={editable}
      
      />

      <Text>Id: {id}</Text>
      <Text>Author: {author}</Text>
      <Text>Title: {title}</Text>
      <Text>Id: {id}</Text>
      <Text>Author: {author}</Text>
      <Text>Title: {title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Edit"
          onPress={() => {
            handleDeleteBook(selectedBookId);
            setSelectedBookId();
          }}
        />
        <Button
          title="Delete"
          onPress={() => {
            Alert.alert("Deleting Book", "Are you sure you want to delete?", [
              {
                text: "Yes",
                onPress: () => {
                  handleDeleteBook(selectedBookId);
                  setSelectedBookId();
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
