import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface UploadImageProps {
  setUploadedImage: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadImage = ({ setUploadedImage }: UploadImageProps) => {
  const uploadImage = async (mode: string) => {
    try {
      let result: any = {};

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
        console.log(newFile);
      }
    } catch (error: any) {
      alert("Error uplading image: " + error.message);
      // setModalVisible(false)
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
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Gallery" onPress={() => uploadImage("gallery")} />
      <Button title="Upload Camera" onPress={() => uploadImage("camera")} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
