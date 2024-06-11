import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
export default function Login({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Hola en el Logiiin</Text>
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
          size="md"
          variant="outline"
          colorScheme="secondary"
          onPress={() => navigation.navigate("PasswordList")}
        >
          SECONDARY
        </Button>
      </View>
    </View>
  );
}
