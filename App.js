import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "./screens/RegisterScreen";
import { NativeBaseProvider } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import PasswordListScreen from "./screens/PasswordListScreen";
import CreatePasswordScreen from "./screens/CreatePasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PasswordList" component={PasswordListScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
