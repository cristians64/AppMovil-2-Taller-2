import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';


//interface paso de prop

interface Props{
    modalMessage:boolean;
    setModalMessage:Function;
}

//fromulario
interface FormMessage {
    nombre:string;
    raza:string;
    edad:string;
}


export const NewMessageComponent = ({modalMessage, setModalMessage}:Props) => {
  
    const [formMessage, setFormMessage] = useState<FormMessage>({
        nombre:'',
        raza:'',
        edad:''
    })

    const handleSetValues =(key:string,value:string) =>{
        setFormMessage({...formMessage,[key]:value})
    }

    //funcion que agrega nuevos mensajes
    const handlesaveMessage = async()=>{

        if(!formMessage.nombre||!formMessage.edad||!formMessage.raza){
            return;
        }

        const dbRef = ref(dbRealTime, 'messages');

        const saveMessage = push(dbRef);

        try{
            await set(saveMessage,formMessage);
            setFormMessage({
                edad:'',
                raza:'',
                nombre:''
            });
        
        }catch(ex){
            console.log(ex)
        }

        setModalMessage(false)
    }


    return (
    <Portal>
    <Modal visible={modalMessage} contentContainerStyle={styles.modalProfile}>
        <View style={styles.headerHome}>
            <Text variant='headlineMedium'>Nueva Mascota</Text>
                <View style={styles.IconProfile}>
                    <IconButton
                        icon="close-circle-outline"
                        size={40}
                        onPress={() => setModalMessage(false)}
                    />
                </View>
        </View>
        <Divider/>
        <TextInput
        label='Nombre'
        mode='outlined'
        onChangeText={(value)=>handleSetValues('nombre',value)}
        />
        <TextInput
        label='Raza'
        mode='outlined'
        onChangeText={(value)=>handleSetValues('raza',value)}
        />
        <TextInput
        label='Edad'
        mode='outlined'
        onChangeText={(value)=>handleSetValues('edad',value)}
        multiline={true}
        numberOfLines={5}
        />
        <Button mode='contained' onPress={handlesaveMessage}>Ingresar</Button>
    </Modal>
  </Portal>
  )
}
