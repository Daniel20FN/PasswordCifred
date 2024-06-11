import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, Alert } from "react-native";
import {
  Button,
  Center,
  VStack,
  Image,
  FormControl,
  Input,
  Heading,
  Divider,
  Link,
} from "native-base";
import { User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usersData = await AsyncStorage.getItem("registros");

      if (usersData !== null) {
        const users: User[] = JSON.parse(usersData);

        const userToFind = users.find(
          (user) => user.username === username && user.password === password
        );
        console.log(userToFind);
        if (userToFind) {
          navigation.navigate("PasswordList");
        } else {
          Alert.alert("Error", "Usuario o Contraseña incorrectos.");
        }
      } else {
        Alert.alert("Error", "No hay usuarios registrados.");
      }
    } catch (error) {
      console.log("Error al Iniciar Sesion");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <VStack
          width="100%"
          height="100%"
          justifyContent={"center"}
          space={4}
          paddingLeft={50}
          paddingRight={50}
        >
          <Center shadow={3} marginBottom={5}>
            <Image
              source={require("../assets/LogoTransparente.png")}
              alt="Logo Encrypt"
              size="xl"
            />
          </Center>
          <FormControl mb="5">
            <Heading>Iniciar Sesion</Heading>
            <Divider />
            <FormControl.Label>Usuario</FormControl.Label>
            <Input value={username} onChangeText={setUsername} />
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <Button
              onPress={handleLogin}
              marginTop={3}
              size="sm"
              bgColor="#B49134"
            >
              Entrar
            </Button>
            <Center marginTop={2}>
              <Link onPress={() => navigation.navigate("Register")}>
                Añadir Cuenta
              </Link>
            </Center>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
