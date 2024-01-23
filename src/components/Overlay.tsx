import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface OverlayProps {
  onPress: () => void;
}

export const Overlay = ({ onPress }: OverlayProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.overlay}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
