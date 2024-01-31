import * as React from "react";
import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { Home } from "../screens/Home";
import { RootStackParamList } from "./RootStackParamList";
import { DiagnosticResult } from "../screens/DiagnosticResult";

const Stack = createStackNavigator<RootStackParamList>();

type Props = {};

const Navigation: FC<Props> = ({}) => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiagnosticResult"
          component={DiagnosticResult}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
