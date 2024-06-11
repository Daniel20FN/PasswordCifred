import React, { useState } from "react";
import { Icon, Input, VStack, View } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
      }}
    >
      <View>
        <VStack w="100%" padding={5} space={2}>
          <Input
            placeholder="Buscar contraseña"
            value={search}
            onChangeText={(text) => setSearch(text)}
            width="100%"
            borderRadius="4"
            focusOutlineColor={"#F1BD3D"}
            onFocus={() => setIsFocused(true)}
            bgColor={isFocused ? "#FFF4DD" : "#F3F4F6"}
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="clear" />}
                onPress={() => setSearch("")}
              />
            }
          />
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
