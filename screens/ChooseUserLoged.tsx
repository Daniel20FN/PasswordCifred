import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, VStack, Divider, Text, Card } from "native-base";
import { User } from "../types/types";
import { useRoute } from "@react-navigation/native";
import { CardComponent } from "../components/General/CardComponent";

const ChooseUserLoged = () => {
  const route = useRoute();
  const logedUsers: User[] = route.params["logedUsers"];
  console.log(logedUsers);

  return (
    <View>
      <VStack>
        {logedUsers &&
          logedUsers.map((user, index) => (
            <CardComponent
              key={index}
              aplicacion={`${user.username} (${user.nombre})`}
              icono={""}
            />
          ))}
      </VStack>
    </View>
  );
};

export default ChooseUserLoged;
