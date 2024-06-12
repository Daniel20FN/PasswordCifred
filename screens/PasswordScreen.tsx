import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Divider, HStack, Icon, IconButton, Text, VStack } from "native-base";
import SearchBar from "../components/PasswordComponents/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import PasswordList from "../components/PasswordComponents/PasswordList";

export default function PasswordScreen({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
      }}
    >
      <View>
        <VStack>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack w={"80%"}>
              <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
            </VStack>
            <VStack w="20%" alignItems="center">
              <IconButton
                icon={
                  <Icon
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
          <PasswordList />
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
