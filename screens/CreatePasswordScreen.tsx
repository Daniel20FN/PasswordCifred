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
import { App } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/General/CustomAlert";

export default function CreatePassword({
  navigation,
  aplicacion,
  icono,
  contraseña,
  setAplicacion,
  setIcono,
  setContraseña,
}: {
  navigation;
  aplicacion: string;
  icono: string;
  contraseña: string;
  setIcono: React.Dispatch<React.SetStateAction<string>>;
  setAplicacion: React.Dispatch<React.SetStateAction<string>>;
  setContraseña: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleNuevoItem = async () => {
    //TODO Gestionar contraseñas existentes, encriptar contrasenas
    try {
      // Crear un objeto con los datos de la contraseña
      const itemdData: App = {
        icon: icono,
        nombre: aplicacion,
        contraseña: contraseña,
      };

      // Obtener los datos de registro guardados en AsyncStorage
      const contraseñasAnteriores = await AsyncStorage.getItem("aplicaciones");
      let nuevaContraseña: App[] = [];

      if (contraseñasAnteriores !== null) {
        // Si hay datos anteriores, convertirlos de JSON a array
        nuevaContraseña = JSON.parse(contraseñasAnteriores);
      }

      const itemExistente = nuevaContraseña.map(
        (e) => e.nombre == itemdData.nombre
      );

      if (itemExistente) {
        setIsOpen(!isOpen);
        <CustomAlert
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Aplicación repetida"}
          text={"Esa aplicación ya está entre tus aplicaciones guardadas"}
        />;
        return "Objeto repetido detectado";
      }

      // Agregar el nuevo registro al array de registros
      nuevaContraseña.push(itemdData);

      // Guardar el array actualizado en AsyncStorage
      await AsyncStorage.setItem(
        "aplicaciones",
        JSON.stringify(nuevaContraseña)
      );

      console.log(nuevaContraseña);

      // Limpiar los campos después de registrar
      setAplicacion("");
      setIcono("");
      setContraseña("");

      // Navegar a la pantalla de lista de contraseñas o cualquier otra pantalla deseada
      navigation.navigate("Login");
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
              <Heading>Guardar nueva contraseña</Heading>
              <Divider />
              <FormControl.Label>Nombre de la app</FormControl.Label>
              <Input value={aplicacion} onChangeText={setAplicacion} />
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                type="password"
                value={contraseña}
                onChangeText={setContraseña}
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
      </View>
    </TouchableWithoutFeedback>
  );
}
