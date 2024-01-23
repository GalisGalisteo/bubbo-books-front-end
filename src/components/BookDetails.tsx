import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Overlay } from "./Overlay";
import { BookForm } from "./BookForm";
import { CustomButton } from "./CustomButton";
import {
  BookDetailsInterface,
  fetchBookById,
  fetchDeleteBook,
} from "../services";
import { Fontisto } from "@expo/vector-icons";
import { modalsBookStyles } from "../styles/global";

interface BookDetailsProps {
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const BookDetails = ({
  selectedBookId,
  setSelectedBookId,
}: BookDetailsProps) => {
  const [bookDetails, setBookDetails] = useState<null | BookDetailsInterface>(
    null
  );
  const [editable, setEditable] = useState(false);

  const fetchBookDetails = async (id: string | null) => {
    try {
      const response = await fetchBookById(id);
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
      const response = await fetchDeleteBook(id);
      if (response.ok) {
        const responseData = await response.json();
        console.log("fetching handleDeleteBook");
      } else {
        console.error("Error deleting book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  const handleDeleteButton = () => {
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
  };

  useEffect(() => {
    selectedBookId && fetchBookDetails(selectedBookId);
  }, [selectedBookId]);

  if (!bookDetails) return null;

  const { id, author, title, summary, yearPublished, genre, isbn, image } =
    bookDetails;

  return (
    <View style={modalsBookStyles.container}>
      <Overlay onPress={() => setSelectedBookId(null)} />
      <ScrollView>
        <View style={modalsBookStyles.modalContainer}>
          <TouchableOpacity onPress={() => setSelectedBookId(null)}>
            <Fontisto name="close-a" size={28} color="#fff" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={modalsBookStyles.bookFormContainer}>
              <BookForm
                bookDetails={{
                  id,
                  author,
                  title,
                  summary,
                  yearPublished,
                  genre,
                  isbn,
                  image,
                }}
                isEditable={editable}
                setIsEditable={setEditable}
                setIsModalVisible={null}
                setSelectedBookId={setSelectedBookId}
              />

              {!editable ? (
                <View style={styles.buttonsContainer}>
                  <CustomButton
                    title="Edit"
                    setFontSize={16}
                    onPress={() => setEditable(true)}
                  />

                  <CustomButton
                    title="Delete"
                    setFontSize={16}
                    onPress={handleDeleteButton}
                  />
                </View>
              ) : null}
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
