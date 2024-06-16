import React from "react";
import {
  Box,
  HStack,
  Text,
  Icon,
  VStack,
  IconButton,
  Divider,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const CardComponent = ({
  aplicacion,
  icono,
  useButton = true,
}: {
  aplicacion: string;
  icono: string;
  useButton: boolean;
}) => {
  return (
    <Box
      alignSelf={"center"}
      width={"90%"}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={2}
      >
        <VStack w={"20%"}>
          <Icon as={Ionicons} name="logo-instagram" size="2xl" color="black" />
        </VStack>
        <VStack w={"60%"}>
          <Text>{aplicacion}</Text>
        </VStack>
        <VStack w="20%" alignItems="center">
          {useButton && (
            <IconButton
              icon={
                <Icon as={MaterialIcons} name="add" size="2xl" color="black" />
              }
              size="lg"
            />
          )}
        </VStack>
      </HStack>
      <Divider bg={"#D3D3D3"} h={"1"} />
    </Box>
  );
};
