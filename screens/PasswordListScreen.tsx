import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Divider,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import SearchBar from "../components/PasswordComponents/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import PasswordList from "../components/PasswordComponents/PasswordList";
import { useRoute } from "@react-navigation/native";
import { User } from "../types/types";

export default function PasswordListScreen({ navigation }) {
  const guestUser: User = {
    nombre: "Invitado",
    username: "invitado",
    password: "root",
    keepLogin: false,
    isActive: false,
  };

  const [isFocused, setIsFocused] = useState(false);
  const [busqueda, setBusqueda] = useState<string | undefined>(undefined);
  const route = useRoute();
  const parametros = route.params;
  const NuevoItemCreado =
    parametros != undefined ? parametros["created"] : false;
  const UsuarioLogeado: User =
    parametros != undefined ? parametros["userLoged"] : guestUser;

  console.log("Usuario en PasswordScree " + UsuarioLogeado.username);
  console.log("Created en PasswordScreem " + NuevoItemCreado);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
      }}
    >
      <ScrollView>
        <VStack>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack w={"80%"}>
              <SearchBar
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
              />
            </VStack>
            <VStack w="20%" alignItems="center">
              <IconButton
                icon={
                  <Icon
                    onPress={() =>
                      navigation.navigate("CreatePassword", {
                        usuario: UsuarioLogeado,
                      })
                    }
                    as={MaterialIcons}
                    name="add"
                    size="2xl"
                    color="black"
                  />
                }
                size="lg"
              />
            </VStack>
          </HStack>
          <Divider bg={"#F1BD3D"} h={"1"} />
          <PasswordList
            NuevoItemCreado={NuevoItemCreado}
            busqueda={busqueda}
            navigation={navigation}
            user={UsuarioLogeado}
          />
        </VStack>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
