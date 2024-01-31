import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../navigations/RootStackParamList";

type UploadImagePropsType = {
  navigation: StackNavigationProp<RootStackParamList, "UploadImage">;
};

export const UploadImage: React.FC<UploadImagePropsType> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Upload image screen</Text>
      <Button
        title="navigate to upload image"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};
