import React, { useState } from "react";
import { View } from "react-native";
import { Box, Center, Heading, VStack } from "native-base";

import { CardComponent } from "../General/CardComponent";
export default function PasswordScreen({
  aplicacion,
  icono,
}: {
  aplicacion: string;
  icono: string;
}) {
  return (
    <View>
      <VStack paddingTop={5}>
        <CardComponent aplicacion={aplicacion} icono={icono} />
      </VStack>
    </View>
  );
}
