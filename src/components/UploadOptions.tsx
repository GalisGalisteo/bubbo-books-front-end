import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, AntDesign, Fontisto } from "@expo/vector-icons";
import { Overlay } from "./Overlay";

interface UploadOptionsProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
  setIsUploadModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadOptions = ({
  onCameraPress,
  onGalleryPress,
  setIsUploadModalVisible,
}: UploadOptionsProps) => {
  return (
    <View style={styles.mainContainer}>
      <Overlay onPress={() => setIsUploadModalVisible(false)} />
      <TouchableOpacity onPress={() => setIsUploadModalVisible(false)}>
        <Fontisto name="close-a" size={28} color="#fff" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={onCameraPress}>
            <Entypo name="camera" size={24} color="black" />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onGalleryPress}
          >
            <AntDesign name="picture" size={24} color="black" />
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    width: "60%",
    aspectRatio: 1.5 / 1,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    width: "60%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2.54,
    elevation: 3,
  },
  optionText: {
    marginTop: 5,
    fontSize: 14,
    color: "black",
  },
});
