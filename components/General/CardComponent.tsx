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

import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import { IconoType } from '../../types/types'

export const CardComponent = ({
  aplicacion,
  icono,
  useButton = true,
  iconoDerecha,
  onPress,
}: {
  aplicacion: string
  icono: IconoType
  useButton: boolean
  iconoDerecha: string
  onPress: () => void
}) => {
  //console.log('Libreria desde card Component: ' + icono.libreria)
  return (
    <Box
      alignSelf={'center'}
      width={'90%'}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={2}
      >
        <VStack w={'20%'}>
          <Icon
            as={
              icono.libreria === 'MaterialIcons'
                ? MaterialIcons
                : icono.libreria === 'Entypo'
                ? Entypo
                : icono.libreria === 'EvilIcons'
                ? EvilIcons
                : icono.libreria === 'Feather'
                ? Feather
                : icono.libreria === 'FontAwesome'
                ? FontAwesome
                : icono.libreria === 'FontAwesome5'
                ? FontAwesome5
                : icono.libreria === 'Fontisto'
                ? Fontisto
                : icono.libreria === 'Foundation'
                ? Foundation
                : icono.libreria === 'Ionicons'
                ? Ionicons
                : icono.libreria === 'MaterialCommunityIcons'
                ? MaterialCommunityIcons
                : icono.libreria === 'AntDesign'
                ? AntDesign
                : icono.libreria === 'Octicons'
                ? Octicons
                : icono.libreria === 'SimpleLineIcons'
                ? SimpleLineIcons
                : icono.libreria === 'Zocial'
                ? Zocial
                : MaterialIcons
            }
            name={icono.nombre}
            size="2xl"
            color="black"
          />
        </VStack>
        <VStack w={'60%'}>
          <Text fontSize={'lg'}>{aplicacion}</Text>
        </VStack>
        <VStack w="20%" alignItems="center">
          {useButton && (
            <IconButton
              onPress={onPress}
              icon={
                <Icon
                  as={MaterialIcons}
                  name={iconoDerecha}
                  size="2xl"
                  color="black"
                />
              }
              size="lg"
            />
          )}
        </VStack>
      </HStack>
      <Divider bg={'#D3D3D3'} h={'1'} />
    </Box>
  )
}
