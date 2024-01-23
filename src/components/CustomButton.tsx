import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  setFontSize: number;
  onPress: () => void;
}

export const CustomButton = ({
  title,
  setFontSize,
  onPress,
}: CustomButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={[styles.title, { fontSize: setFontSize }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00D3B0",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
