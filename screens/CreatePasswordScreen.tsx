import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Center,
  FormControl,
  VStack,
  Image,
  Input,
  Button,
  Checkbox,
} from "native-base";
import { App, User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/General/CustomAlert";
import { useRoute } from "@react-navigation/native";
import CryptoJS from "crypto-js";

function generateSecurePassword(length = 20) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function CreatePassword({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [useGeneratedPassword, setUseGeneratedPassword] = useState(false);

  const [aplicacion, setAplicacion] = useState("");
  const [icono, setIcono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [title, setTitle] = useState("");
  const [textAlert, setTextAlert] = useState("");

  const route = useRoute();
  const user: User = route.params["usuario"];

  const handleNuevoItem = async () => {
    // Crear un objeto con los datos de la contraseña
    const itemData: App = {
      icon: icono,
      nombre: aplicacion,
      contraseña: contraseña,
      username: user.username,
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
      (e) => e.nombre === itemData.nombre && e.username === itemData.username
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
    const hash = CryptoJS.SHA256(contraseña).toString();
    itemData.contraseña = hash;
    nuevaContraseña.push(itemData);

    // Guardar el array actualizado en AsyncStorage
    if (itemData.contraseña != "" && itemData.nombre != "") {
      await AsyncStorage.setItem(
        "aplicaciones",
        JSON.stringify(nuevaContraseña)
      ).then(() => {
        setTitle("Aplicación guardada ");
        setTextAlert(
          "Su aplicación se ha almacenado correctamente, revise su lista cuando no recuerde su contraseña"
        );
      });
    } else {
      setTitle("Los campos no pueden estar vacíos");
      setTextAlert("Rellene los campos correctamente");
      setIsOpen(true);
      return;
    }

    // Limpiar los campos después de registrar
    setAplicacion("");
    setIcono("");
    setContraseña("");

    // Navegar a la pantalla de lista de contraseñas o cualquier otra pantalla deseada
    navigation.navigate("Tab", {
      screen: "PasswordList",
      params: { userLoged: user },
    });
  };

  // Handler para generar y establecer una contraseña aleatoria
  const handleGeneratedPassword = () => {
    if (useGeneratedPassword) {
      setContraseña(generateSecurePassword());
    }
  };

  // Efecto para generar contraseña cuando el checkbox está seleccionado
  React.useEffect(() => {
    handleGeneratedPassword();
  }, [useGeneratedPassword]);

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
              source={require("../assets/LogoTransparenteSinLetras.png")}
              alt="Logo Encrypt"
              size="xl"
            />
          </Center>
          <FormControl mb="5">
            <FormControl.Label>Nombre de la app</FormControl.Label>
            <Input
              value={aplicacion}
              onChangeText={(text) => setAplicacion(text)}
            />
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={contraseña}
              onChangeText={(text) => setContraseña(text)}
              marginBottom={5}
            />
            <Checkbox
              isChecked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              value={""}
            >
              Mostrar Contraseña
            </Checkbox>
            <Checkbox
              isChecked={useGeneratedPassword}
              onChange={() => {
                setUseGeneratedPassword(!useGeneratedPassword),
                  setContraseña("");
              }}
              value={""}
            >
              Usar Contraseña Aleatoria
            </Checkbox>
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
