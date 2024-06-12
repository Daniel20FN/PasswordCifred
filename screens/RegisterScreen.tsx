import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
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

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Error al Registrarse");
  const [textAlert, setTextAlert] = useState("");

  const handleRegister = async () => {
    //TODO encriptar contrasenas
    try {
      // Crear un objeto con los datos del usuario
      const userData: User = {
        nombre,
        username,
        password,
      };

      // Obtener los datos de registro guardados en AsyncStorage
      const registrosAnteriores = await AsyncStorage.getItem("registros");
      let nuevosRegistros: User[] = [];

      if (registrosAnteriores !== null) {
        // Si hay datos anteriores, convertirlos de JSON a array
        nuevosRegistros = JSON.parse(registrosAnteriores);
      }

      //Comprobar que el usuario no esta registrado ya
      const usuarioExistente = nuevosRegistros.find(
        (user) => user.username === username
      );

      if (usuarioExistente) {
        setIsOpen(true);
        setTextAlert(
          "Ya existe un usuario con estas credenciales, por favor cree uno nuevo o inicie sesion."
        );
      } else {
        // Agregar el nuevo registro al array de registros
        nuevosRegistros.push(userData);

        // Guardar el array actualizado en AsyncStorage
        await AsyncStorage.setItem(
          "registros",
          JSON.stringify(nuevosRegistros)
        );

        console.log(nuevosRegistros);

        // Limpiar los campos después de registrar
        setNombre("");
        setUsername("");
        setPassword("");

        // Navegar a la pantalla de lista de contraseñas o cualquier otra pantalla deseada
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
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
            <Heading>Registrarse</Heading>
            <Divider />
            <FormControl.Label>Nombre</FormControl.Label>
            <Input value={nombre} onChangeText={setNombre} />
            <FormControl.Label>Usuario</FormControl.Label>
            <Input value={username} onChangeText={setUsername} />
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <Button
              onPress={handleRegister}
              marginTop={3}
              size="sm"
              bgColor="#B49134"
            >
              Registrarse
            </Button>
            <Center marginTop={2}>
              <Link onPress={() => navigation.navigate("Login")}>
                Iniciar Sesion
              </Link>
            </Center>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
