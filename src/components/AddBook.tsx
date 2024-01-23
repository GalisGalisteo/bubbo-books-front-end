import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Overlay } from "./Overlay";
import { BookForm } from "./BookForm";
import { Fontisto } from "@expo/vector-icons";
import { modalsBookStyles } from "../styles/global";

interface AddBookProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBook = ({ setIsModalVisible }: AddBookProps) => {
  return (
    <View style={modalsBookStyles.container}>
      <Overlay onPress={() => setIsModalVisible(false)} />
      <ScrollView>
        <View style={modalsBookStyles.modalContainer}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Fontisto name="close-a" size={28} color="#fff" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={modalsBookStyles.bookFormContainer}>
              <BookForm
                bookDetails={null}
                isEditable={true}
                setIsEditable={setIsModalVisible}
                setIsModalVisible={setIsModalVisible}
                setSelectedBookId={null}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
