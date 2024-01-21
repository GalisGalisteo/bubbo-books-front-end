import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { BookDetails } from "./BookDetails";
import { fetchAddBook, fetchUpdateBook } from "../services";

interface BookFormProps {
  bookDetails: BookDetails | null;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>> | null;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
}

interface Values {
  author: string;
  title: string;
  summary: string;
  yearPublished: string;
  genre: string;
  isbn: string;
}

export const BookForm = ({
  bookDetails,
  isEditable,
  setIsEditable,
  setIsModalVisible,
}: BookFormProps) => {
  const { id, author, title, summary, yearPublished, genre, isbn } =
    bookDetails || {};

  const initialValues = {
    author: author ?? "",
    title: title ?? "",
    summary: summary ?? "",
    yearPublished: yearPublished ?? "",
    genre: genre ?? "",
    isbn: isbn ?? "",
  };

  const handleAddBook = async (data: BookDetails) => {
    try {
      const response = await fetchAddBook(data);
      if (response.ok) {
        const responseData = await response.json();
        console.log("fetching handleAddBook");
        return responseData;
      } else {
        console.error("Error adding book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };
  const handleUpdateBook = async (
    id: string | undefined,
    data: BookDetails
  ) => {
    try {
      const response = await fetchUpdateBook(id, data);
      if (response.ok) {
        const responseData = await response.json();
        console.log("fetching handleUpdateBook");
        return responseData;
      } else {
        console.error("Error updating book");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };

  const handleOnSubmit = async (values: Values) => {
    try {
      if (bookDetails) {
        await handleUpdateBook(id, values);
      } else {
        await handleAddBook(values);
        console.log(values);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      if (setIsEditable) {
        setIsEditable(false);
      }
      if (setIsModalVisible) {
        setIsModalVisible(false);
      }
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleOnSubmit(values)}
      >
        {({ handleChange, values, handleSubmit }) => (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Author: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="Enter Author Name"
                onChangeText={handleChange("author")}
                value={values.author}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Title: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="Enter Title"
                onChangeText={handleChange("title")}
                value={values.title}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Summary: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="Enter summary"
                onChangeText={handleChange("summary")}
                value={values.summary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Year published: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="e.g. 1982"
                onChangeText={handleChange("yearPublished")}
                value={values.yearPublished}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Genre: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="Enter Genre"
                onChangeText={handleChange("genre")}
                value={values.genre}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>ISBN: </Text>
              <TextInput
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="1234567890123"
                onChangeText={handleChange("isbn")}
                value={values.isbn}
              />
            </View>
            {isEditable ? (
              <View>
                <Button
                  title="Submit"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            ) : null}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
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

const isEditableStyles = (editable: boolean) => {
  return editable
    ? [styles.inputText, styles.borderEditable]
    : [styles.inputText];
};
