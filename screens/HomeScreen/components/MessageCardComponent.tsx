import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Message } from '../HomeScreen';

interface Props {
  message:Message;
}

export const MessageCardComponent=({message}:Props)=> {
  return (
    <View style={styles.rootCard}>
        <View>
            <Text variant='labelLarge'>Nombre: {message.nombre}</Text>
            <Text variant='bodyMedium'>Edad: {message.edad}</Text>
            <Text variant='bodyMedium'>Raza {message.raza}</Text>
        </View>
        <View style={styles.IconProfile} >
            <IconButton
              icon="email-open"
              size={25}
              onPress={() => console.log ('Pressed')}
            />
        </View>
    </View>
  )
}

