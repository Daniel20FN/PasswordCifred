import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardComponent } from "../General/CardComponent";
import { App, User } from "../../types/types";

export default function PasswordScreen({
  navigation,
  NuevoItemCreado,
  busqueda,
  user,
}: {
  navigation;
  NuevoItemCreado: object;
  busqueda: string | undefined;
  user: User;
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
        {filteredApps.map(
          (app, index) =>
            app.username == user.username && (
              <CardComponent
                key={index}
                aplicacion={app.nombre}
                icono={"logo-instagram"}
                useButton
                iconoDerecha={"visibility"}
                onPress={() => {
                  navigation.navigate("CreatePassword");
                }}
              />
            )
        )}
      </VStack>
    </View>
  );
}
