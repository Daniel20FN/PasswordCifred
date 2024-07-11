/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage'
import CryptoJS from 'crypto-js'
import {
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Image,
  Input,
  Link,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import CustomAlert from '../components/General/CustomAlert'
import { User } from '../types/types'

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('Error al Registrarse')
  const [textAlert, setTextAlert] = useState('')

  const handleRegister = async () => {
    try {
      if (
        nombre.trim() !== '' &&
        username.trim() != '' &&
        password.trim() != ''
      ) {
        const hash = CryptoJS.SHA256(password).toString()

        const userData: User = {
          nombre,
          username,
          password: hash,
          keepLogin: false,
          isActive: false,
        }

        // Obtener los datos de registro guardados en AsyncStorage
        const registrosAnteriores = await AsyncStorage.getItem('registros')
        let nuevosRegistros: User[] = []

        if (registrosAnteriores !== null) {
          // Si hay datos anteriores, convertirlos de JSON a array
          nuevosRegistros = JSON.parse(registrosAnteriores)
        }

        //Comprobar que el usuario no esta registrado ya
        const usuarioExistente = nuevosRegistros.find(
          (user) => user.username === username,
        )

        if (usuarioExistente) {
          setIsOpen(true)
          setTextAlert(
            'Ya existe un usuario con estas credenciales, por favor cree uno nuevo o inicie sesion.',
          )
        } else {
          // Agregar el nuevo registro al array de registros
          nuevosRegistros.push(userData)

          // Guardar el array actualizado en AsyncStorage
          await AsyncStorage.setItem(
            'registros',
            JSON.stringify(nuevosRegistros),
          )

          console.log(nuevosRegistros)

          // Limpiar los campos después de registrar
          setNombre('')
          setUsername('')
          setPassword('')

          // Navegar a la pantalla de lista de contraseñas o cualquier otra pantalla deseada
          navigation.navigate('Login', { shouldReload: false })
        }
      } else {
        setIsOpen(true)
        setTextAlert('Rellene todos los campos por favor.')
        setTitle('Campos Vacios')
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error)
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
            <Heading>Registrarse</Heading>
            <Divider />
            <FormControl.Label>Nombre</FormControl.Label>
            <Input value={nombre} onChangeText={setNombre} />
            <FormControl.Label>Usuario</FormControl.Label>
            <Input value={username} onChangeText={setUsername} />
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <Button
              onPress={handleRegister}
              marginTop={3}
              size="sm"
              bgColor="#B49134"
            >
              Registrarse
            </Button>
            <Center marginTop={2}>
              <Link onPress={() => navigation.navigate('Login')}>
                Iniciar Sesion
              </Link>
            </Center>
          </FormControl>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  )
}
