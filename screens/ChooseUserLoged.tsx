/* eslint-disable react/prop-types */
import { useRoute } from '@react-navigation/native'
import { Divider, Heading, Link, VStack } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { CardComponent } from '../components/General/CardComponent'
import { User } from '../types/types'

const ChooseUserLoged = ({ navigation }) => {
  const route = useRoute()
  const logedUsers: User[] = route.params['logedUsers']
  console.log(logedUsers)

  const handleLogin = (user) => {
    navigation.navigate('Tab', {
      screen: 'PasswordList',
      params: { userLoged: user },
    })
  }

  return (
    <View>
      <VStack
        width="100%"
        height="80%"
        justifyContent={'center'}
        space={4}
        alignItems={'center'}
      >
        <Heading>Cuentas disponibles:</Heading>
        <Link
          onPress={() => navigation.navigate('Login', { shouldReload: false })}
        >
          Usar otra cuenta
        </Link>
        <Divider />
        {logedUsers &&
          logedUsers.map((user, index) => (
            <CardComponent
              key={index}
              aplicacion={`${user.username} (${user.nombre})`}
              icono={'person-outline'}
              useButton
              iconoDerecha={'double-arrow'}
              onPress={() => handleLogin(user)}
            />
          ))}
      </VStack>
    </View>
  )
}

export default ChooseUserLoged
