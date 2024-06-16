import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Divider,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import SearchBar from "../components/PasswordComponents/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import PasswordList from "../components/PasswordComponents/PasswordList";
import { useRoute } from "@react-navigation/native";

export default function PasswordListScreen({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const route = useRoute();
  const NuevoItemCreado = route.params;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
      }}
    >
      <ScrollView>
        <VStack>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack w={"80%"}>
              <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
            </VStack>
            <VStack w="20%" alignItems="center">
              <IconButton
                icon={
                  <Icon
                    onPress={() => navigation.navigate("CreatePassword")}
                    as={MaterialIcons}
                    name="add"
                    size="2xl"
                    color="black"
                  />
                }
                size="lg"
              />
            </VStack>
          </HStack>
          <Divider bg={"#F1BD3D"} h={"1"} />
          <PasswordList NuevoItemCreado={NuevoItemCreado} />
        </VStack>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
