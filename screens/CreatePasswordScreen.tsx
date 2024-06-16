import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Box,
  Center,
  FormControl,
  Heading,
  VStack,
  Image,
  Divider,
  Input,
  Link,
  Button,
} from "native-base";
import { App, User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/General/CustomAlert";

export default function CreatePassword({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const [aplicacion, setAplicacion] = useState("");
  const [icono, setIcono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [title, setTitle] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [created, setCreated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleNuevoItem = async () => {
    // Crear un objeto con los datos de la contraseña
    const itemData: App = {
      icon: icono,
      nombre: aplicacion,
      contraseña: contraseña,
      username: "s",
    };

    // Obtener los datos de registro guardados en AsyncStorage
    const contraseñasAnteriores = await AsyncStorage.getItem("aplicaciones");
    let nuevaContraseña: App[] = [];

    if (contraseñasAnteriores !== null) {
      // Si hay datos anteriores, convertirlos de JSON a array
      nuevaContraseña = JSON.parse(contraseñasAnteriores);
    }

    // Verificar si la aplicación ya existe
    const itemExistente = nuevaContraseña.some(
      (e) => e.nombre === itemData.nombre
    );

    if (itemExistente) {
      setTitle("Aplicación repetida");
      setTextAlert("Esta aplicación ya está creada");
      setIsOpen(true);
      setAplicacion("");
      setIcono("");
      setContraseña("");
      return;
    }

    // Agregar el nuevo registro al array de registros
    nuevaContraseña.push(itemData);

    // Guardar el array actualizado en AsyncStorage
    await AsyncStorage.setItem(
      "aplicaciones",
      JSON.stringify(nuevaContraseña)
    ).then(() => {
      setTitle("Aplicación guardada ");
      setTextAlert(
        "Su aplicación se ha almacenado correctamente, revise su lista cuando no recuerde su contraseña"
      );
      setIsOpen(true);
    });

    // Limpiar los campos después de registrar
    setAplicacion("");
    setIcono("");
    setContraseña("");
    setCreated(!created);
    // Navegar a la pantalla de lista de contraseñas o cualquier otra pantalla deseada
    navigation.navigate("PasswordList", { created: created });
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
          <FormControl mb="5">
            <Heading>Guardar nueva contraseña</Heading>
            <Divider />
            <FormControl.Label>Nombre de la app</FormControl.Label>
            <Input
              value={aplicacion}
              onChangeText={(text) => setAplicacion(text)}
            />
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              value={contraseña}
              onChangeText={(text) => setContraseña(text)}
            />
            <Button
              onPress={handleNuevoItem}
              marginTop={3}
              size="sm"
              bgColor="#B49134"
            >
              Crear
            </Button>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
