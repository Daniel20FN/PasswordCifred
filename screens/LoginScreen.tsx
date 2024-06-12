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
import CustomAlert from "../components/General/CustomAlert";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Error al Iniciar Sesion");
  const [textAlert, setTextAlert] = useState("");

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
          setUsername("");
          setPassword("");

          navigation.navigate("PasswordList");
        } else {
          setIsOpen(true);
          setUsername("");
          setPassword("");
          setTextAlert("Usuario o Contraseña incorrectos.");
          //Alert.alert("Error", "Usuario o Contraseña incorrectos.");
        }
      } else {
        //Alert.alert("Error", "No hay usuarios registrados.");
        setIsOpen(true);
        setUsername("");
        setPassword("");
        setTextAlert("No hay usuarios registrados.");
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
        <CustomAlert
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          text={textAlert}
        />
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
              <Link onPress={() => navigation.navigate("PasswordList")}>
                To password
              </Link>
            </Center>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
