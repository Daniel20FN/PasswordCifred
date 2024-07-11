/* eslint-disable react/prop-types */
import { IconPicker } from '@grassper/react-native-icon-picker'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

export default function LogoPickerScreen({ navigation }) {
  const handleSubmit = (id, iconName, iconSet, iconColor, backgroundColor) => {
    navigation.goBack({ icono: iconName })
    console.log({ id, iconName, iconSet, iconColor, backgroundColor })
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconPickerContainer}>
        <IconPicker
          iconsTitle="Iconos"
          numColumns={6}
          iconSize={30}
          iconColor="#fff"
          backgroundColor="#B49134"
          placeholderText="Buscar..."
          placeholderTextColor="#999"
          onClick={handleSubmit}
          iconContainerStyle={styles.iconContainer}
          textStyle={styles.textHeaders}
          textInputStyle={styles.SearchBar}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconPickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#B49134',
  },
  textHeaders: {
    color: '#999',
  },
  SearchBar: {
    backgroundColor: '#fff',
    borderColor: '#B49134',
    borderWidth: 2,
    minWidth: 300,
    color: '#000',
  },
})
