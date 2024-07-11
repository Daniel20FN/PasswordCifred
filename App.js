/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import LogoPickerScreen from './components/PasswordComponents/LogoPicker'
import AccountDataScreen from './screens/AccountDataScreen'
import AccountScreen from './screens/AccountScreen'
import ChooseUserLoged from './screens/ChooseUserLoged'
import CreatePasswordScreen from './screens/CreatePasswordScreen'
import LoginScreen from './screens/LoginScreen'
import PasswordDetailsScreen from './screens/PasswordDetailsScreen'
import PasswordListScreen from './screens/PasswordListScreen'
import RegisterScreen from './screens/RegisterScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarActiveTintColor: '#F1BD3D', // Color del texto cuando está seleccionado
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#B49134',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="PasswordList"
        component={PasswordListScreen}
        options={{
          title: 'Contraseñas',
          tabBarLabel: 'Contraseñas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed" color={'#F1BD3D'} size={size + 5} />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={AccountScreen}
        options={{
          title: 'Mi Cuenta',
          tabBarLabel: 'Mi Cuenta',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'person'} color={'#F1BD3D'} size={size + 5} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#B49134',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Iniciar Sesión',
              headerShown: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Tab"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Registrarse',
              headerShown: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePasswordScreen}
            options={{ title: 'Crear Contraseña' }}
          />
          <Stack.Screen
            name="PasswordDetailsScreen"
            component={PasswordDetailsScreen}
            options={{ title: 'Detalles de contraseña' }}
          />
          <Stack.Screen
            name="LogoPickerScreen"
            component={LogoPickerScreen}
            options={{ title: 'Seleccionar Logo' }}
          />
          <Stack.Screen
            name="ChooseUserLoged"
            component={ChooseUserLoged}
            options={{
              title: 'Usuarios con Sesión Iniciada',
              headerLeft: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccountDataScreen"
            component={AccountDataScreen}
            options={{
              title: 'Mis Datos',
              headerLeft: null,
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
