import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Box, Center, Heading, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardComponent } from "../General/CardComponent";
import { App } from "../../types/types";
import { useRoute } from "@react-navigation/native";

export default function PasswordScreen({
  NuevoItemCreado,
}: {
  NuevoItemCreado: object;
}) {
  const [aplicacionesGuardadas, setAplicacionesGuardadas] = useState<App[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("aplicaciones");
      setAplicacionesGuardadas(JSON.parse(data));
    };
    fetchData();
  }, [NuevoItemCreado]);
  return (
    <View>
      <VStack paddingTop={5}>
        {aplicacionesGuardadas &&
          aplicacionesGuardadas.map((e, index) => (
            <CardComponent key={index} aplicacion={e.nombre} icono={e.icon} />
          ))}
      </VStack>
    </View>
  );
}
