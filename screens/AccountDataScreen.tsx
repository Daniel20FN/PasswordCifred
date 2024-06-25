import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "native-base";
import { User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/General/CustomAlert";
import { useRoute } from "@react-navigation/native";

// TODO Terminar vista para modificar y consultar datos
const AccountDataScreen = () => {
  const route = useRoute();
  const params = route.params;
  const userLoged: User = params != undefined ? params["userLoged"] : null;

  return (
    <View>
      <Text>{userLoged.username}</Text>
    </View>
  );
};

export default AccountDataScreen;
