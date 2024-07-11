import { MaterialIcons } from '@expo/vector-icons'
import { Icon, Input, VStack, View } from 'native-base'
import React from 'react'

export default function SearchBar({
  isFocused,
  setIsFocused,
  busqueda,
  setBusqueda,
}: {
  isFocused: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
  busqueda: string | undefined
  setBusqueda: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  return (
    <View>
      <VStack w="100%" padding={5} space={2}>
        <Input
          placeholder="Buscar contraseña"
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
          width="100%"
          borderRadius="4"
          focusOutlineColor={'#F1BD3D'}
          onFocus={() => setIsFocused(true)}
          bgColor={isFocused ? '#FFF4DD' : '#F3F4F6'}
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="clear" />}
              onPress={() => setBusqueda(undefined)}
            />
          }
        />
      </VStack>
    </View>
  )
}
