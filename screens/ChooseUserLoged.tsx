import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  VStack,
  Divider,
  Text,
  Card,
  Icon,
  Heading,
} from "native-base";
import { User } from "../types/types";
import { useRoute } from "@react-navigation/native";
import { CardComponent } from "../components/General/CardComponent";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ChooseUserLoged = ({ navigation }) => {
  const route = useRoute();
  const logedUsers: User[] = route.params["logedUsers"];
  console.log(logedUsers);

  const handleLogin = (user) => {
    navigation.navigate("PasswordList", { userLoged: user });
  };

  return (
    <View>
      <VStack
        width="100%"
        height="80%"
        justifyContent={"center"}
        space={4}
        alignItems={"center"}
      >
        <Heading>Cuenta a usar</Heading>
        <Divider />
        {logedUsers &&
          logedUsers.map((user, index) => (
            <CardComponent
              key={index}
              aplicacion={`${user.username} (${user.nombre})`}
              icono={"person-outline"}
              useButton
              iconoDerecha={"keyboard-double-arrow-right"}
              onPress={() => handleLogin(user)}
            />
          ))}
      </VStack>
    </View>
  );
};

export default ChooseUserLoged;
