import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export interface Book {
  author: string;
  title: string;
  id: string;
}

type PressHandlerType = (id: string) => void;

export interface ItemProps {
  item: Book;
  pressHandler: PressHandlerType;
}

export const BookItem = ({ item, pressHandler }: ItemProps) => {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.id)}>
      <View style={styles.item}>
        <Image
          source={{
            uri: "https://www.cwhaydenonline.com/media/wysiwyg/red_button_new_customer.png",
          }}
          style={styles.image}
        />
        <Text>Author: {item.author}</Text>
        <Text>Title: {item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    gap: 10,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 50,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});