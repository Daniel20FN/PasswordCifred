/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ENCRYPTION_KEY } from '@env'
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import CryptoJS from 'crypto-js'
import {
  Center,
  Checkbox,
  Divider,
  FormControl,
  Icon,
  IconButton,
  Input,
  Text,
  View,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import CustomAlertAccept from '../components/General/CustomAlertAccept'
import { App, User } from '../types/types'

const PasswordDetailsScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [title, setTitle] = useState('')
  const [textAlert, setTextAlert] = useState('')
  const route = useRoute()
  const user: User = route.params['usuario']
  const app: App = route.params['App']

  const decrypt = (cadena) => {
    const bytes = CryptoJS.AES.decrypt(cadena, ENCRYPTION_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted
  }

  const showAlert = () => {
    setTitle('Eliminar Contraseña')
    setTextAlert('Esta seguro que quiere eliminar la contraseña?')
    setIsOpen(true)
  }

  const deletePassword = async (currentApp: App) => {
    const contraseñasAnteriores = await AsyncStorage.getItem('aplicaciones')
    const apps: App[] = contraseñasAnteriores
      ? JSON.parse(contraseñasAnteriores)
      : []
    const appsUpdated = apps.filter(
      (app: App) =>
        !(
          app.nombre === currentApp.nombre &&
          app.username === currentApp.username
        ),
    )
    AsyncStorage.setItem('aplicaciones', JSON.stringify(appsUpdated))
    console.log('Eliminado')
    navigation.goBack()
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View>
        <CustomAlertAccept
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          text={textAlert}
          onAccept={() => deletePassword(app)}
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
            <Icon
              as={
                app.icon.libreria === 'MaterialIcons'
                  ? MaterialIcons
                  : app.icon.libreria === 'Entypo'
                  ? Entypo
                  : app.icon.libreria === 'EvilIcons'
                  ? EvilIcons
                  : app.icon.libreria === 'Feather'
                  ? Feather
                  : app.icon.libreria === 'FontAwesome'
                  ? FontAwesome
                  : app.icon.libreria === 'FontAwesome5'
                  ? FontAwesome5
                  : app.icon.libreria === 'Fontisto'
                  ? Fontisto
                  : app.icon.libreria === 'Foundation'
                  ? Foundation
                  : app.icon.libreria === 'Ionicons'
                  ? Ionicons
                  : app.icon.libreria === 'MaterialCommunityIcons'
                  ? MaterialCommunityIcons
                  : app.icon.libreria === 'AntDesign'
                  ? AntDesign
                  : app.icon.libreria === 'Octicons'
                  ? Octicons
                  : app.icon.libreria === 'SimpleLineIcons'
                  ? SimpleLineIcons
                  : app.icon.libreria === 'Zocial'
                  ? Zocial
                  : MaterialIcons
              }
              name={app.icon.nombre}
              size="6xl"
              color="black"
            />
          </Center>
          <Divider />
          <Center>
            <Text fontSize={'2xl'}>{app.nombre}</Text>
            <FormControl mb="5">
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                size={'xl'}
                type={showPassword ? 'text' : 'password'}
                value={showPassword ? decrypt(app.contraseña) : app.contraseña}
                readOnly
              />
            </FormControl>
          </Center>
          <Checkbox
            isChecked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            value={''}
          >
            Ver contraseña
          </Checkbox>
          <IconButton
            bgColor={'#B49134'}
            icon={<Icon as={MaterialIcons} name="delete" color="white" />}
            onPress={() => showAlert()}
          />
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PasswordDetailsScreen
