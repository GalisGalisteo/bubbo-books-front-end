import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { BookDetails } from "./BookDetails";

interface BookFormProps {
  bookDetails: BookDetails;
  isEditable: boolean;
}

export const BookForm = ({ bookDetails, isEditable }: BookFormProps) => {
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

  const { author, title, summary, yearPublished, genre, isbn } = bookDetails;

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Author: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={author}
          onChangeText={(input) => {
            updateInput("author", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Title: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={title}
          onChangeText={(input) => {
            updateInput("title", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Summary: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={summary}
          onChangeText={(input) => {
            updateInput("summary", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Year published: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={yearPublished}
          onChangeText={(input) => {
            updateInput("yearPublished", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Genre: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={genre}
          onChangeText={(input) => {
            updateInput("genre", input);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>ISBN: </Text>
        <TextInput
          editable={isEditable}
          style={isEditableStyles(isEditable)}
          defaultValue={isbn}
          onChangeText={(input) => {
            updateInput("isbn", input);
          }}
        />
      </View>
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
