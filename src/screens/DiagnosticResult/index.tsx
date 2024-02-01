import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../navigations/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import Overlay from "react-native-loading-spinner-overlay";
import { getDiagnosticResult } from "../../api/getDiagnosticResult";

type DiagnosticResultPropsType = {
  navigation: StackNavigationProp<RootStackParamList, "DiagnosticResult">;
  route: RouteProp<RootStackParamList, "DiagnosticResult">;
};

export const DiagnosticResult: React.FC<DiagnosticResultPropsType> = ({
  navigation,
  route,
}) => {
  const [diagnosticResult, setDiagnosticResult] = useState<
    { [key in string]: string } | null
  >(null);

  const { isLoading, data } = useQuery(
    ["api/v1/items"],
    () => getDiagnosticResult(route.params?.idResult),
    {
      onSuccess: (res) => {
        setDiagnosticResult(res.data);
      },
    }
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 37,
          paddingTop: 44,
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
          style={{ width: "100%", backgroundColor: "#87DBFF", marginTop: 43 }}
        >
          <View style={{ paddingVertical: 35, backgroundColor: "#CEF0FF" }}>
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 24 }}>烈紋1: 0</Text>
              <Text style={{ fontSize: 24 }}>烈紋2: 1</Text>
              <Text style={{ fontSize: 24 }}>烈紋1: 0</Text>
              <Text style={{ fontSize: 24 }}>烈紋2: 1</Text>
            </View>

            <View style={{ marginLeft: 16, marginRight: 20, marginTop: 30 }}>
              <Text style={{ fontSize: 20 }}>
                診断の結果、あなたの健康状態 {"\n"}は可もなく不可もなくです。
                {"\n"}
                年齢に合った健康状態と言えま す。ここから良くするも悪くす{"\n"}
                るも全てあなた次第です。
              </Text>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 57 }}>
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
      <Overlay visible={isLoading} overlayColor="#87DBFF" />
    </SafeAreaView>
  );
};
