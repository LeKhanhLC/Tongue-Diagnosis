import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../navigations/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import Overlay from "react-native-loading-spinner-overlay";
import { getDiagnosticResult } from "../../api/getDiagnosticResult";
import { SafeAreaView } from "react-native-safe-area-context";

type DiagnosticResultPropsType = {
  navigation: StackNavigationProp<RootStackParamList, "DiagnosticResult">;
  route: RouteProp<RootStackParamList, "DiagnosticResult">;
};

type ResultResponseType = {
  createdAt: string;
  id: number;
  imageUrl: string;
  result: { [key in string]: string };
  status: string;
  updatedAt: string;
};

export const DiagnosticResult: React.FC<DiagnosticResultPropsType> = ({
  navigation,
  route,
}) => {
  const [diagnosticResult, setDiagnosticResult] =
    useState<ResultResponseType | null>(null);

  useQuery(
    ["api/v1/items"],
    () => getDiagnosticResult(route.params?.idResult),
    {
      enabled: diagnosticResult?.status !== "FINISHED",
      refetchInterval: (data) => {
        return data?.data?.status !== "FINISHED" ? 3000 : false;
      },
      onSuccess: (res) => {
        if (res.data?.status === "FINISHED") {
          setDiagnosticResult(res.data);
        }
        if (res.data?.status === "FAILED") {
          if (Platform.OS === "ios") {
            Alert.alert("Diagnosis failure", "", [
              {
                text: "RETRY",
                onPress: () => navigation.navigate("Home"),
                style: "cancel",
              },
            ]);
          } else {
            ToastAndroid.show("Some Alert Toast", ToastAndroid.LONG);
            navigation.navigate("Home");
          }
        }
      },
    }
  );

  if (!diagnosticResult?.result) {
    return (
      <Overlay
        visible={!diagnosticResult?.result}
        overlayColor="#87DBFF"
        textContent="診断中です・・・・・・"
        size={Platform.OS === "android" ? 50 : "large"}
        textStyle={{ color: "white", fontWeight: "400", marginTop: -30 }}
      />
    );
  }
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: windowHeight,
      }}
    >
      <ScrollView nestedScrollEnabled style={{ height: windowHeight }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 37,
            paddingTop: 14,
            paddingBottom: 60,
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 71,
                backgroundColor: "#87DBFF",
              }}
            >
              <Text style={{ fontSize: 36 }}>診断結果</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "#87DBFF",
              marginTop: 23,
            }}
          >
            <View style={{ paddingVertical: 35, backgroundColor: "#CEF0FF" }}>
              <View style={{ marginLeft: 16 }}>
                {Object.keys(diagnosticResult?.result).map((item) => (
                  <Text style={{ fontSize: 24 }}>
                    {item}: {diagnosticResult?.result[item]}
                  </Text>
                ))}
              </View>

              <View style={{ marginLeft: 16, marginRight: 20, marginTop: 30 }}>
                <Text style={{ fontSize: 20 }}>
                  診断の結果、あなたの健康状態 {"\n"}は可もなく不可もなくです。
                  {"\n"}
                  年齢に合った健康状態と言えま す。ここから良くするも悪くす
                  {"\n"}
                  るも全てあなた次第です。
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: 246, marginTop: 27 }}>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 27,
                paddingVertical: 37,
                borderRadius: 10,
                backgroundColor: "#2C9AFF",
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={{ fontSize: 24, color: "#ffffff" }}>
                もう一度診断する
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
