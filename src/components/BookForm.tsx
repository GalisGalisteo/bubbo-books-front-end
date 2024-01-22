import { Formik } from "formik";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { BookDetails } from "./BookDetails";
import { emptyImage, fetchAddBook, fetchUpdateBook } from "../../services";
import { UploadImage } from "./UploadImage";
import { useState } from "react";

interface BookFormProps {
  bookDetails: BookDetails | null;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>> | null;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
  //  uploadedImage: string;
}

export const BookForm = ({
  bookDetails,
  isEditable,
  setIsEditable,
  setIsModalVisible,
}: //uploadedImage,
BookFormProps) => {
  const [uploadedImage, setUploadedImage] = useState<string>(
    bookDetails?.image || emptyImage
  );
  let { id, author, title, summary, yearPublished, genre, isbn } =
    bookDetails || {};
  console.log("uploadedImage in BookForm", uploadedImage);

  const initialValues = {
    author: author ?? "",
    title: title ?? "",
    summary: summary ?? "",
    yearPublished: yearPublished ?? "",
    genre: genre ?? "",
    isbn: isbn ?? "",
    image: uploadedImage,
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

  const handleOnSubmit = async (values: BookDetails) => {
    try {
      if (bookDetails) {
        await handleUpdateBook(id, values);
        console.log(values);
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
      <Image
        source={{
          uri: uploadedImage,
        }}
        style={styles.image}
      />
      {isEditable ? <UploadImage setUploadedImage={setUploadedImage} /> : null}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.image = uploadedImage; // test without this line
          console.log("onSubmitValues", values.image);
          return handleOnSubmit(values);
        }}
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
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

const isEditableStyles = (editable: boolean) => {
  return editable
    ? [styles.inputText, styles.borderEditable]
    : [styles.inputText];
};
