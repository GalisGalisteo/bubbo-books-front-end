import { StyleSheet, View } from "react-native";
import { CustomButton } from "./CustomButton";

interface FooterProps {
  onPress: () => void;
}

export const Footer = ({ onPress }: FooterProps) => {
  return (
    <View style={styles.container}>
      <CustomButton title="Add a book" setFontSize={24} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 85,
    paddingTop: 15,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});
