import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, TouchableWithoutFeedback } from "react-native";
import {
  View,
  Button,
  VStack,
  Text,
  Box,
  Heading,
  Center,
  Divider,
  FormControl,
  Input,
  Checkbox,
  Image,
  HStack,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { App, User } from "../types/types";
import { getCurrentUser } from "./PasswordListScreen";
import CustomAlert from "../components/General/CustomAlert";
import { useRoute } from "@react-navigation/native";

const PasswordDetailsScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [title, setTitle] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const route = useRoute();
  const user: User = route.params["usuario"];
  const app: App = route.params["App"];
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <CustomAlert
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          text={textAlert}
        />
        <VStack
          width="100%"
          height="100%"
          justifyContent={"center"}
          space={4}
          paddingLeft={50}
          paddingRight={50}
        >
          <Center shadow={3} marginBottom={5}>
            <Icon as={MaterialIcons} name={app.icon} size="2xl" color="black" />
          </Center>
          <Center>
            <Text fontSize={"2xl"}>{app.nombre}</Text>
            <Text fontSize={"2xl"}>{app.contraseña}</Text>
          </Center>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordDetailsScreen;
