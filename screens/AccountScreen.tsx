import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { VStack, Text, Box, Heading, Center, Divider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/types";
import { getCurrentUser } from "./PasswordListScreen";

const CuentaScreen = ({ navigation }) => {
  const [userLoged, setUserLoged] = useState<User>();

  useEffect(() => {
    const userFromPasswordList: User = getCurrentUser();
    setUserLoged(userFromPasswordList);
    //console.log(userLoged.username);
    console.log(userFromPasswordList);
  }, [navigation]);

  const handleChangeAccount = () => {
    navigation.navigate("Login", { shouldReload: true });
    console.log("Cambiando de cuenta....");
  };

  const handleLogout = async () => {
    const usersData = await AsyncStorage.getItem("registros");

    if (usersData !== null) {
      const users: User[] = JSON.parse(usersData);
      const currentUser = users.find(
        (user) => user.username === userLoged.username
      );
      console.log(currentUser);
      currentUser.keepLogin = false;
      currentUser.isActive = false;
      console.log(currentUser);
      await AsyncStorage.setItem("registros", JSON.stringify(users));
      console.log(users);

      console.log("Cerrando Sesion....");
      navigation.navigate("Login");
    }
  };

  return (
    <View>
      <VStack space={2} p={2}>
        <Box width={"100%"}>
          <Pressable
            onPress={() =>
              navigation.navigate("AccountDataScreen", { userLoged: userLoged })
            }
          >
            <Box borderColor={"gray.300"} borderWidth={2} p={3} rounded={10}>
              <Text fontSize={"lg"}>Mis Datos</Text>
            </Box>
          </Pressable>
        </Box>
        <Box width={"100%"}>
          <Pressable onPress={handleChangeAccount}>
            <Box borderColor={"gray.300"} borderWidth={2} p={3} rounded={10}>
              <Text fontSize={"lg"}>Cambiar Cuenta</Text>
            </Box>
          </Pressable>
        </Box>
        <Box width={"100%"}>
          <Pressable onPress={handleLogout}>
            <Box
              borderColor={"gray.300"}
              borderWidth={2}
              p={3}
              rounded={10}
              bgColor={"red.500"}
            >
              <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>
                Cerrar Sesion
              </Text>
            </Box>
          </Pressable>
        </Box>
      </VStack>
      <Divider />
      <Center>
        <Text fontSize={"md"}>
          Usuario Actual: {userLoged && userLoged.username}
        </Text>
      </Center>
    </View>
  );
};

export default CuentaScreen;
