import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardComponent } from "../General/CardComponent";
import { App } from "../../types/types";

export default function PasswordScreen({
  NuevoItemCreado,
  busqueda,
}: {
  NuevoItemCreado: object;
  busqueda: string | undefined;
}) {
  const [aplicacionesGuardadas, setAplicacionesGuardadas] = useState<App[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("aplicaciones");
      if (data) {
        setAplicacionesGuardadas(JSON.parse(data));
      }
    };
    fetchData();
  }, [NuevoItemCreado]);

  const filteredApps = aplicacionesGuardadas.filter((app) =>
    app.nombre.toLowerCase().includes(busqueda?.toLowerCase() || "")
  );

  return (
    <View>
      <VStack paddingTop={5}>
        {filteredApps.map((app, index) => (
          <CardComponent
            key={index}
            aplicacion={app.nombre}
            icono={app.icon}
            useButton
          />
        ))}
      </VStack>
    </View>
  );
}
