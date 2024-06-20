import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import PasswordListScreen from "./screens/PasswordListScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen";
import ChooseUserLoged from "./screens/ChooseUserLoged";
import Footer from "./components/General/Footer";

const Stack = createNativeStackNavigator();

function AppNavigator({ routeName, setRouteName }) {
  return (
    <>
      <Stack.Navigator
        screenOptions={({ route }) => {
          setRouteName(route.name);
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PasswordList" component={PasswordListScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
        <Stack.Screen name="ChooseUserLoged" component={ChooseUserLoged} />
      </Stack.Navigator>
      {routeName !== "Login" && routeName !== "Register" && <Footer />}
    </>
  );
}

export default function App() {
  const [routeName, setRouteName] = useState("Login");

  const handleStateChange = (state) => {
    if (state) {
      const currentRouteName = state.routes[state.index]?.name;
      setRouteName(currentRouteName);
    }
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer onStateChange={handleStateChange}>
        <AppNavigator routeName={routeName} setRouteName={setRouteName} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
