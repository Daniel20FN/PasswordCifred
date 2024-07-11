import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { VStack } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'
import { App, User } from '../../types/types'
import { CardComponent } from '../General/CardComponent'

export default function PasswordScreen({
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  NuevoItemCreado,
  busqueda,
  user,
}: {
  navigation
  NuevoItemCreado: boolean
  busqueda: string | undefined
  user: User
}) {
  const [aplicacionesGuardadas, setAplicacionesGuardadas] = useState<App[]>([])
  useFocusEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('aplicaciones')
      if (data) {
        setAplicacionesGuardadas(JSON.parse(data))
        //console.log(aplicacionesGuardadas);
      }
    }
    fetchData()
  })

  const filteredApps = aplicacionesGuardadas.filter((app) =>
    app.nombre.toLowerCase().includes(busqueda?.toLowerCase() || '')
  )

  return (
    <View>
      <VStack paddingTop={5}>
        {filteredApps.map(
          (app, index) =>
            app.username == user.username && (
              <CardComponent
                key={index}
                aplicacion={app.nombre}
                icono={'logo-instagram'}
                useButton
                iconoDerecha={'visibility'}
                onPress={() => {
                  navigation.navigate('PasswordDetailsScreen', {
                    usuario: user,
                    App: app,
                  })
                }}
              />
            )
        )}
      </VStack>
    </View>
  )
}
