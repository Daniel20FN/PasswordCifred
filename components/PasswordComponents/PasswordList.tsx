import React, { useState } from "react";
import { View } from "react-native";
import { Box, Center, Heading, VStack } from "native-base";

import { CardComponent } from "../General/CardComponent";
export default function PasswordScreen() {
  const [aplicacion, setAplicacion] = useState("");
  const [icono, setIcono] = useState("");

  return (
    <View>
      <VStack>
        <Center marginTop={5} marginBottom={5}>
          <Heading>Lista de aplicaciones</Heading>
        </Center>
        <CardComponent aplicacion={aplicacion} icono={icono} />
      </VStack>
    </View>
  );
}
