import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../navigations/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import useImagePicker from "../../hook/useImagePicker";
import { ImagePickerAsset, PermissionStatus } from "expo-image-picker";
import { useMutation } from "react-query";
import Overlay from "react-native-loading-spinner-overlay";
import { uploadImageData } from "../../api/postImage";
import mime from "mime";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type HomePropsType = { navigation: HomeScreenNavigationProp };

export const Home: React.FC<HomePropsType> = ({ navigation }) => {
  const [imagePicker, setImagePicker] = useState<ImagePickerAsset | null>(null);

  const getFormData = () => {
    const formData = new FormData();
    formData.append("file", {
      uri: imagePicker?.uri,
      name: imagePicker?.uri.split("/").pop(),
      type: mime.getType(imagePicker?.uri as string),
      // type: "image/jpeg",
    } as unknown as Blob);
    return formData;
  };

  const { mutate, isLoading } = useMutation(
    () => uploadImageData(getFormData()),
    {
      onError: (error) => {
        console.log("Error occurred while uploading image:", error);
      },
      onSuccess: (data) => {
        navigation.navigate("DiagnosticResult", { idResult: data.data.id });
      },
    }
  );

  const {
    pickPhoto,
    mediaLibraryStatus,
    isMediaLibraryAvailable,
    requestMediaLibraryPermission,
  } = useImagePicker({
    onPickPhoto: async (photo) => {
      if (photo.canceled) return;

      setImagePicker(photo.assets?.[0] as ImagePickerAsset);
    },
  });

  const handleUpload = () => {
    mutate();
  };

  useEffect(() => {
    setImagePicker(null);
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "#000000",
          backgroundColor: "#ffffff",
          borderRadius: 10,
          marginBottom: 40,
          marginLeft: 38,
          marginRight: 38,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: 51, marginBottom: 28 }}>
            <Text style={{ fontSize: 20 }}>舌を撮影した写真を </Text>
            <Text style={{ fontSize: 20 }}>アップロードしてください。</Text>
          </View>

          <Image
            source={
              imagePicker
                ? { uri: imagePicker.uri }
                : require("../../../assets/Rectangle-people.png")
            }
            style={styles.image}
          />
          <Text style={{ fontSize: 20 }}>
            {!!imagePicker?.fileName ? imagePicker.fileName : "サンプル"}
          </Text>

          <View
            style={{
              width: "100%",
              marginTop: 29,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 246,
                height: 69,
                borderRadius: 10,
                marginBottom: 45,
                backgroundColor: "#E3E3E3",
              }}
              onPress={async () => {
                if (
                  mediaLibraryStatus === PermissionStatus.UNDETERMINED ||
                  mediaLibraryStatus === PermissionStatus.DENIED
                ) {
                  requestMediaLibraryPermission();
                }
                if (mediaLibraryStatus === PermissionStatus.GRANTED)
                  await pickPhoto();
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                {imagePicker
                  ? "写真を変更する"
                  : "カメラロールから\n ファイルを選択する"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 29,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              disabled={!imagePicker}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 246,
                height: 103,
                borderRadius: 10,
                marginBottom: 45,
                backgroundColor: !imagePicker ? "#E3E3E3" : "#2C9AFF",
              }}
              onPress={handleUpload}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="large" />
              ) : (
                <Text style={{ fontSize: 40, color: "#ffffff" }}>診断する</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    width: 239,
    height: 241,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
});
