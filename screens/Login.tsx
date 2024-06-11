import React from "react";
import { Text, View } from "react-native";
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

export default function Login({ navigation }) {
  return (
    <View>
      <VStack
        width="100%"
        height="100%"
        justifyContent={"center"}
        space={4}
        paddingLeft={50}
        paddingRight={50}
      >
        <Center shadow={3} marginBottom={100}>
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
          <Input />
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" />
          <Button marginTop={3} size="sm" bgColor="#B49134">
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
  );
}
