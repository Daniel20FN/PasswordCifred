import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import PasswordListScreen from "./screens/PasswordListScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen";
import ChooseUserLoged from "./screens/ChooseUserLoged";
import CuentaScreen from "./screens/AccountScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarActiveTintColor: "#F1BD3D", // Color del texto cuando está seleccionado
        tabBarInactiveTintColor: "gray",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#B49134",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="PasswordList"
        component={PasswordListScreen}
        options={{
          title: "Contraseñas",
          tabBarLabel: "Contraseñas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed" color={"#F1BD3D"} size={size + 5} />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={CuentaScreen}
        options={{
          title: "Mi Cuenta",
          tabBarLabel: "Mi Cuenta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"person"} color={"#F1BD3D"} size={size + 5} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#B49134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Iniciar Sesión",
              headerShown: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Tab"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Registrarse",
              headerShown: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePasswordScreen}
            options={{ title: "Crear Contraseña" }}
          />
          <Stack.Screen
            name="ChooseUserLoged"
            component={ChooseUserLoged}
            options={{
              title: "Usuarios con Sesión Iniciada",
              headerLeft: null,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
