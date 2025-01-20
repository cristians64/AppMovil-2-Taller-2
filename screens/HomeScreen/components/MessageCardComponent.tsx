import { View } from 'react-native'
import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Message } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
  message:Message;
}

export const MessageCardComponent=({message}:Props)=> {

  const navigation = useNavigation();


  return (
    <View style={styles.rootCard}>
        <View>
            <Text variant='labelLarge'>Mascota: {message.to}</Text>
            <Text variant='bodyMedium'>Motivo: {message.subject}</Text>
            
        </View>
        <View style={styles.IconProfile} >
            <IconButton
              icon="menu-open"
              size={25}
              onPress={() => navigation.dispatch(CommonActions.navigate({name:"DetailsScreen",params:{message} } ))}
            />
        </View>
    </View>
  )
}

