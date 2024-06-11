import React from "react";
import { View } from "react-native";
import { Divider, HStack, Icon, IconButton, Text, VStack } from "native-base";
import SearchBar from "../components/PasswordComponents/SearchBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PasswordList({ navigation }) {
  return (
    <View>
      <VStack>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack w={"80%"}>
            <SearchBar />
          </VStack>
          <VStack w="20%" alignItems="center">
            <IconButton
              icon={
                <Icon as={MaterialIcons} name="add" size="2xl" color="black" />
              }
              size="lg"
            />
          </VStack>
        </HStack>
        <Divider bg={"#F1BD3D"} h={"1"} />
      </VStack>
    </View>
  );
}
