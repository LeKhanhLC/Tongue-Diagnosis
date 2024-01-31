import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Splash: FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/Background-Image.png")}
        style={styles.image}
      />
      <Text style={styles.text}>舌診アプリ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87DBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Splash;
