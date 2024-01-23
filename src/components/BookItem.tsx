import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Book, emptyImage } from "../services";

export interface ItemProps {
  item: Book;
  pressHandler: (id: string) => void;
}

export const BookItem = ({ item, pressHandler }: ItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => pressHandler(item.id)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.image || emptyImage,
            }}
            style={styles.image}
          />
          <Text style={styles.title}> {item.title}</Text>
          <Text style={styles.author}> {item.author}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 30,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1.3,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
  },
});
