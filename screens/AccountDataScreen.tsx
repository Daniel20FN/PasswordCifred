import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import CryptoJS from 'crypto-js'
import {
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Heading,
  Input,
  Switch,
  Text,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import CustomAlert from '../components/General/CustomAlert'
import { User } from '../types/types'

const AccountDataScreen = () => {
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newKeepLogin, setNewKeepLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('Error')
  const [textAlert, setTextAlert] = useState('')
  const dataChanged: string[] = []
  const route = useRoute()
  const params = route.params
  const userLoged: User = params != undefined ? params['userLoged'] : null

  const handleChangeData = async () => {
    const usersData = await AsyncStorage.getItem('registros')
    if (usersData !== null) {
      const users: User[] = JSON.parse(usersData)

      const userToFind = users.find(
        (user) => user.username === userLoged.username,
      )

      if (userToFind) {
        if (newName.trim() != '') {
          if (newKeepLogin != userToFind.keepLogin) {
            userToFind.keepLogin = newKeepLogin
            dataChanged.push('Mantener Sesion iniciada')
          }

          if (newName != userToFind.nombre && newName != ' ') {
            userToFind.nombre = newName
            dataChanged.push('Nombre')
          } else {
            setIsOpen(true)
            setTitle('Campo Incorrecto (Nombre)')
            setTextAlert('Por favor ingrese un Nombre valido.')
          }

          if (
            CryptoJS.SHA256(newPassword).toString() != userToFind.password &&
            newPassword.trim() != ''
          ) {
            userToFind.password = CryptoJS.SHA256(newPassword).toString()
            dataChanged.push('Contraseña')
          } else {
            setIsOpen(true)
            setTitle('Campo Incorrecto (Contraseña)')
            setTextAlert('Por favor ingrese una Contraseña valida.')
          }
          await AsyncStorage.setItem('registros', JSON.stringify(users))
          setIsOpen(true)
          setTitle('Cambios guardados correctamente.')
          setTextAlert(
            'Se ha modificado correctamente los siguientes datos: ' +
              dataChanged.toString(),
          )
        } else {
          setIsOpen(true)
          setTextAlert('Campos incorrectos, intentelo de nuevo.')
        }
      } else {
        setTextAlert('Error al encontrar al usuario')
        setIsOpen(true)
      }
    } else {
      //Alert.alert("Error", "No hay usuarios registrados.");
      setIsOpen(true)
      setTextAlert('No hay usuarios registrados.')
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
        <Center>
          <VStack
            width="100%"
            height="100%"
            justifyContent={'center'}
            space={4}
            paddingLeft={50}
            paddingRight={50}
          >
            <Center>
              <Heading>Modificar mis Datos</Heading>
            </Center>
            <Divider />
            <FormControl mb="5">
              <FormControl.Label>Usuario</FormControl.Label>
              <Input value={userLoged && userLoged.username} readOnly />
              <FormControl.Label>
                Nombre (Actual: {userLoged.nombre})
              </FormControl.Label>
              <Input value={newName} onChangeText={setNewName} />
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                type="password"
                value={newPassword}
                onChangeText={setNewPassword}
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
                    setNewKeepLogin(e)
                  }}
                />
              </HStack>
              <Button
                onPress={handleChangeData}
                marginTop={3}
                size="sm"
                bgColor="#B49134"
              >
                Guardar
              </Button>
            </FormControl>
          </VStack>
        </Center>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AccountDataScreen
