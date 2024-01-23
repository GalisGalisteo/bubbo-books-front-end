import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { UploadImage } from "./UploadImage";
import { CustomButton } from "./CustomButton";
import {
  BookDetailsInterface,
  emptyImage,
  fetchAddBook,
  fetchUpdateBook,
} from "../services";

const reviewSchema = yup.object({
  author: yup.string().required(),
  title: yup.string().required(),
  yearPublished: yup.number().required().min(1000).max(2024),
  genre: yup.string().required(),
  isbn: yup.number().required(),
});

interface BookFormProps {
  bookDetails: BookDetailsInterface | null;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>> | null;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>> | null;
}

export const BookForm = ({
  bookDetails,
  isEditable,
  setIsEditable,
  setIsModalVisible,
  setSelectedBookId,
}: BookFormProps) => {
  const [uploadedImage, setUploadedImage] = useState<string>(
    bookDetails?.image || emptyImage
  );
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  let { id, author, title, summary, yearPublished, genre, isbn } =
    bookDetails || {};

  const initialValues = {
    author: author ?? "",
    title: title ?? "",
    summary: summary ?? "",
    yearPublished: yearPublished ?? "",
    genre: genre ?? "",
    isbn: isbn ?? "",
    image: uploadedImage,
  };

  const handleAddBook = async (data: BookDetailsInterface) => {
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
    data: BookDetailsInterface
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

  const handleOnSubmit = async (values: BookDetailsInterface) => {
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
      if (setIsEditable) setIsEditable(false);
      if (setIsModalVisible) setIsModalVisible(false);
    }
  };

  const handleCancelButton = () => {
    if (setIsModalVisible) setIsModalVisible(false);
    if (setSelectedBookId) setSelectedBookId(null);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsUploadModalVisible(true)}>
        <Image
          source={{
            uri: uploadedImage,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      {isUploadModalVisible ? (
        <UploadImage
          setUploadedImage={setUploadedImage}
          setIsUploadModalVisible={setIsUploadModalVisible}
          isUploadModalVisible={isUploadModalVisible}
        />
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          values.image = uploadedImage;
          return handleOnSubmit(values);
        }}
      >
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Author: </Text>
              <TextInput
                multiline={true}
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
                multiline={true}
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="Enter Title"
                onChangeText={handleChange("title")}
                value={values.title}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Year published: </Text>
              <TextInput
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={4}
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
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={13}
                editable={isEditable}
                style={isEditableStyles(isEditable)}
                placeholder="1234567890123"
                onChangeText={handleChange("isbn")}
                value={values.isbn}
              />
            </View>
            <Text style={{ color: "red" }}>
              {touched.author && errors.author && `${errors.author}, `}
              {touched.title && errors.title && `${errors.title}, `}
              {touched.author &&
                errors.yearPublished &&
                `${errors.yearPublished}, `}
              {touched.author && errors.genre && `${errors.genre}, `}
              {touched.author && errors.isbn && `${errors.isbn}.`}
            </Text>
            {isEditable ? (
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title={"Submit"}
                  setFontSize={16}
                  onPress={() => handleSubmit()}
                />
                <CustomButton
                  title={"Cancel"}
                  setFontSize={16}
                  onPress={() => handleCancelButton()}
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
  image: {
    width: "100%",
    aspectRatio: 1 / 1.3,
    borderRadius: 10,
    marginBottom: 7,
  },
  formContainer: {
    gap: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputText: {
    flex: 1,
    borderRadius: 10,
    padding: 8,
    fontSize: 18,
  },
  borderEditable: {
    borderWidth: 0.5,
    borderColor: "#7FD2C4",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const isEditableStyles = (editable: boolean) => {
  return editable
    ? [styles.inputText, styles.borderEditable]
    : [styles.inputText];
};
