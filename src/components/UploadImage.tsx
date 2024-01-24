import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UploadOptions } from "./UploadOptions";

interface UploadImageProps {
  setUploadedImage: React.Dispatch<React.SetStateAction<string>>;
  setIsUploadModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isUploadModalVisible: boolean;
}

export const UploadImage = ({
  setUploadedImage,
  setIsUploadModalVisible,
  isUploadModalVisible,
}: UploadImageProps) => {
  const getImage = async (mode: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        const newImage = await result.assets[0].uri;
        const newFile = {
          uri: result.assets[0].uri,
          type: `test/${newImage.split(".")[1]}`,
          name: `${newImage.split("/ImagePicker/")[1]}`,
        };
        await handleUpload(newFile);
        setIsUploadModalVisible(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Error getting image: " + error.message);
      } else {
        alert("Error getting image");
      }
    }
  };

  const handleUpload = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "bubbo-books");
    data.append("cloud_name", "dfqoeq3s7");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfqoeq3s7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setUploadedImage(responseData.url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Error updating image: " + error.message);
        console.error("Error updating immage: ", error.message);
      } else {
        alert("Error getting image");
        console.error("Error updating immage: ", error);
      }
    }
  };

  return (
    <View>
      <Modal visible={isUploadModalVisible} transparent animationType="fade">
        <UploadOptions
          onCameraPress={() => getImage("camera")}
          onGalleryPress={() => getImage("gallery")}
          setIsUploadModalVisible={setIsUploadModalVisible}
        />
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
};
