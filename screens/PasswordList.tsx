import React from "react";
import { Button, Text, View, ViewBase } from "react-native";

export default function Login({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Hola en el Password List</Text>
      <View
        style={{
          position: "absolute",
          //top: 800,
          bottom: 30,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
