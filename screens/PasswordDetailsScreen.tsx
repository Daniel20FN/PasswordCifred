/* eslint-disable @typescript-eslint/no-unused-vars */
import { ENCRYPTION_KEY } from '@env'
import { MaterialIcons } from '@expo/vector-icons'
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
import CustomAlert from '../components/General/CustomAlert'
import { App, User } from '../types/types'

// eslint-disable-next-line react/prop-types
const PasswordDetailsScreen = ({ navigation }) => {
  // TODO: Terminar vista de la contrasena, que se oculte despues de x segundos y quitar comillas
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [title, setTitle] = useState('')
  const [textAlert, setTextAlert] = useState('')
  const route = useRoute()
  const user: User = route.params['usuario']
  const app: App = route.params['App']

  const passwordHashed = app.contraseña

  const decrypt = (cadena) => {
    const bytes = CryptoJS.AES.decrypt(cadena, ENCRYPTION_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted
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
            <Icon as={MaterialIcons} name={app.icon} size="2xl" color="black" />
          </Center>
          <Divider />
          <Center>
            <Text fontSize={'2xl'}>{app.nombre}</Text>
            <Divider />
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
            icon={<Icon as={MaterialIcons} name="delete" color="black" />}
          />
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PasswordDetailsScreen
