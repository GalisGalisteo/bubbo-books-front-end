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
  const [bookDetails, setBookDetails] = useState<null | BookDetails>(null);
  const [editable, setEditable] = useState(false);

  const [inputs, setInputs] = useState({
    author: "",
    title: "",
    summary: "",
    yearPublished: "",
    genre: "",
    isbn: "",
  });

  const updateInput = (name: string, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  //   const [inputAuthor, setInputAuthor] = useState("");
  //   const [inputTitle, setInputTitle] = useState("");
  //   const [inputSummary, setInputSummary] = useState("");
  //   const [inputYearPublished, setInputYearPublished] = useState("");

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

  const { author, title, summary, yearPublished, genre, isbn } = bookDetails;

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
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Author: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={author}
          onChangeText={(input) => {
            updateInput("author", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Title: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={title}
          onChangeText={(input) => {
            updateInput("title", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Summary: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={summary}
          onChangeText={(input) => {
            updateInput("summary", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Year published: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={yearPublished}
          onChangeText={(input) => {
            updateInput("yearPublished", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Genre: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={genre}
          onChangeText={(input) => {
            updateInput("genre", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>ISBN: </Text>
        <TextInput
          editable={editable}
          style={isEditable(editable)}
          defaultValue={isbn}
          onChangeText={(input) => {
            updateInput("isbn", input);
          }}
        />
      </View>

      {!editable ? (
        <View style={{ flexDirection: "row" }}>
          <Button title="Edit" onPress={() => setEditable(true)} />
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
      ) : (
        <View>
          <Button title="Submit" onPress={() => {}} />
        </View>
      )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTitle: {
    fontSize: 18,
  },
  inputText: {
    borderRadius: 10,
    padding: 8,
    width: "auto",
    fontSize: 18,
  },
  borderEditable: {
    borderWidth: 1,
    borderColor: "#999",
  },
});

const isEditable = (editable: boolean) => {
  return editable
    ? [styles.inputText, styles.borderEditable]
    : [styles.inputText];
};
