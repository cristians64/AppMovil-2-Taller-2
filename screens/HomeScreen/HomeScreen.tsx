import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { View, FlatList, StyleSheet } from 'react-native';
import { styles } from '../../theme/styles';

import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase, { updateProfile } from '@firebase/auth'
import { MessageCardComponent } from './components/MessageCardComponent';
import { NewMessageComponent } from './components/NewMessageComponent';
import { DataSnapshot, onValue, ref } from 'firebase/database';

interface FormUser {
  name: string;
}

export interface Message {
  id:string;
  nombre:string;
  raza:string;
  edad:string;

}

const HomeScreen = () => {

  //permitir capturar data del usuario
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

  //estado del form user
  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  //arreglo lista de mensajes
  const [messages, setMessages] = useState<Message[]>([])

  const [modalMessage, setModalMessage] = useState<boolean>(false)

  useEffect(() => {
    setUserAuth(auth.currentUser)
    setFormUser({ name: auth.currentUser?.displayName ?? '' })

    getAllMessages();
  }, [])

  const [modalProfile, setModalProfile] = useState<boolean>(false);

  const handleSetvalues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value })
  }

  const handleUpdateUser = async () => {
    await updateProfile(userAuth!, {
      displayName: formUser.name
    })

    //cerrar el modal
    setModalProfile(false);
  }

  const getAllMessages = () =>{

    const dbRef = ref (dbRealTime, 'messsages');

    onValue(dbRef,(DataSnapshot)=>{
      const data = DataSnapshot.val()||{};

      const getKeys = Object.keys(data);

      const listMessage:Message[]=[];

      getKeys.forEach((key)=>{
        const value={...data[key],id:key}

        listMessage.push(value);
      })

      setMessages(listMessage);

    })

  }

  return (
    <>
      <View style={styles.rootHome} >
        <View style={styles.headerHome}>
          <Avatar.Text size={24} label="MI" />
          <View>
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>{userAuth?.displayName}</Text>
          </View>
          <View style={styles.IconProfile}>
            <IconButton
              icon="account-cog"
              mode='contained'
              size={30}
              onPress={() => setModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageCardComponent message={item} /> }
            keyExtractor={item => item.id}
          />
        </View>


      </View>


      <Portal>
        <Modal visible={modalProfile} contentContainerStyle={styles.modalProfile}>
          <View style={styles.headerHome}>
            <Text variant='headlineMedium'>Mi perfil</Text>
            <View style={styles.IconProfile}>
              <IconButton
                icon="close-circle-outline"
                size={40}
                onPress={() => setModalProfile(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name}
            onChangeText={(value) => handleSetvalues('name', value)}
          />
          <TextInput
            mode='outlined'
            label='Correo'
            value={userAuth?.email!}
            disabled
          />
          <Button mode='contained' onPress={handleUpdateUser} >Actualizar</Button>
        </Modal>
      </Portal>

          <FAB
        icon="plus"
        style={styles.fabmessage}
        onPress={() => setModalMessage(true)}
        />

        <NewMessageComponent modalMessage={modalMessage} setModalMessage={setModalMessage}/>
    </>
  );

};

export default HomeScreen;