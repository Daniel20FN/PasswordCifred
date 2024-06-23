import React from "react";
import { View } from "react-native";
import { VStack, Divider, Heading, Link } from "native-base";
import { User } from "../types/types";
import { useRoute } from "@react-navigation/native";
import { CardComponent } from "../components/General/CardComponent";

const ChooseUserLoged = ({ navigation }) => {
  const route = useRoute();
  const logedUsers: User[] = route.params["logedUsers"];
  console.log(logedUsers);

  const handleLogin = (user) => {
    navigation.navigate("Tab", {
      screen: "PasswordList",
      params: { userLoged: user },
    });
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
        <Heading>Cuentas disponibles:</Heading>
        <Link onPress={() => navigation.navigate("Login")}>
          Usar otra cuenta
        </Link>
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
