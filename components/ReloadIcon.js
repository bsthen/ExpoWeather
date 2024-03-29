import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/index";

export default function ReloadIcon({ load }) {
  const reloadIconName = Platform.OS == "ios" ? "ios-refresh" : "refresh";
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        onPress={load}
        name={reloadIconName}
        size={24}
        color={Colors.SECONDARY_COLOR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reloadIcon: {
    position: "absolute",
    top: 30,
    right: 20,
  },
});
