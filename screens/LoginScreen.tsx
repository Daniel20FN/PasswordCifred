/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import CryptoJS from 'crypto-js'
import {
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Switch,
  Text,
  VStack,
} from 'native-base'
import React, { useCallback, useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import CustomAlert from '../components/General/CustomAlert'
import { User } from '../types/types'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState('Error al Iniciar Sesion')
  const [textAlert, setTextAlert] = useState('')
  const [keepLogin, setKeepLogin] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logedUsers, setLogedUsers] = useState<User[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logedUser, setLogedUser] = useState<User>(undefined)

  const route = useRoute()
  const params = route.params
  const shouldVerifyUser = params !== undefined ? params['shouldReload'] : true
  //console.log(shouldVerifyUser);
  useFocusEffect(
    useCallback(() => {
      if (shouldVerifyUser) {
        const verifyUserLoged = async () => {
          try {
            const usersData = await AsyncStorage.getItem('registros')
            if (usersData !== null) {
              const users: User[] = JSON.parse(usersData)
              const lastUsersLoged = users.filter(
                (user) => user.keepLogin === true,
              )
              if (!(lastUsersLoged.length == 0)) {
                if (lastUsersLoged.length >= 1) {
                  setLogedUsers(lastUsersLoged)

                  navigation.navigate('ChooseUserLoged', {
                    logedUsers: lastUsersLoged,
                  })
                }
              }
            }
          } catch (error) {
            console.error('Error al verificar el usuario logueado:', error)
          }
        }

        verifyUserLoged()
      }
    }, [navigation, shouldVerifyUser]),
  )

  const handleLogin = async () => {
    try {
      const usersData = await AsyncStorage.getItem('registros')
      if (usersData !== null) {
        const users: User[] = JSON.parse(usersData)

        const hash = CryptoJS.SHA256(password).toString()

        const userToFind = users.find(
          (user) => user.username === username && user.password === hash,
        )

        if (userToFind) {
          setUsername('')
          setPassword('')

          //console.log(keepLogin);
          if (keepLogin) {
            userToFind.keepLogin = keepLogin
          }
          userToFind.isActive = true

          await AsyncStorage.setItem('registros', JSON.stringify(users))

          setLogedUser(userToFind)

          navigation.navigate('Tab', {
            screen: 'PasswordList',
            params: { userLoged: userToFind },
          })
        } else {
          setTextAlert('Usuario o Contraseña incorrectos.')
          setIsOpen(true)
          setUsername('')
          setPassword('')
          //Alert.alert("Error", "Usuario o Contraseña incorrectos.");
        }
      } else {
        //Alert.alert("Error", "No hay usuarios registrados.");
        setIsOpen(true)
        setUsername('')
        setPassword('')
        setTextAlert('No hay usuarios registrados.')
      }
    } catch (error) {
      console.log('Error al Iniciar Sesion')
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
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
          justifyContent={'center'}
          space={4}
          paddingLeft={50}
          paddingRight={50}
        >
          <Center shadow={3} marginBottom={5}>
            <Image
              source={require('../assets/LogoTransparente.png')}
              alt="Logo Encrypt"
              size="xl"
            />
          </Center>
          <FormControl mb="5">
            <Heading>Iniciar Sesion</Heading>
            <Divider />
            <FormControl.Label>Usuario</FormControl.Label>
            <Input value={username} onChangeText={setUsername} />
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <HStack alignItems="center" space={4}>
              <Text>Mantener Sesión Iniciada</Text>
              <Switch
                defaultIsChecked={false}
                offTrackColor="red.300"
                onTrackColor="orange.200"
                onThumbColor="orange.500"
                offThumbColor="red.500"
                onValueChange={(e) => {
                  setKeepLogin(e)
                }}
              />
            </HStack>
            <Button
              onPress={handleLogin}
              marginTop={3}
              size="sm"
              bgColor="#B49134"
            >
              Entrar
            </Button>
            <Center marginTop={2}>
              <Link onPress={() => navigation.navigate('Register')}>
                Añadir Cuenta
              </Link>
            </Center>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  )
}
