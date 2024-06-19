import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Center,
  HStack,
  Text,
  NativeBaseProvider,
  Box,
  Pressable,
  Icon,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Footer = () => {
  const [selected, setSelected] = useState(1);
  return (
    <Box bg="white" width="100%">
      <HStack bg="yellow.600" alignItems="center" shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "home" : "home-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? "account" : "account-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Cuenta
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
