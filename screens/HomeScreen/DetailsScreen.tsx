import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Message } from './HomeScreen'
import { styles } from '../../theme/styles'
import { dbRealTime } from '../../config/firebaseConfig'
import { ref, remove, update } from 'firebase/database'


export const DetailsScreen = () => {

    //hook a inicio
    const navigation=useNavigation();

    //informacion de rutas
    const route = useRoute();

    //@ts-ignore
    const {message} = route.params;

    const [formEditMessage, setFormEditMessage] = useState<Message>({
        id:"",
        to:'',
        subject:'',
        message:'',
        especie: '',
        raza: '',
        edad: '',
        dueño: '',
        contacto: '',
        historial: '',
    })

    useEffect(() => {
      setFormEditMessage(message);
    }, [])
    
    const handleSetValues =(key:string,value:string)=>{
        setFormEditMessage({...formEditMessage,[key]:value})
    }

    //actualizar mensajes
    const handleUpdateMessage =async()=>{
        //referencia
        const dbRef = ref(dbRealTime, 'messages/' + formEditMessage.id);

        await update (dbRef,{to:formEditMessage.to, message:formEditMessage.message, subject: formEditMessage.subject,
            especie:formEditMessage.especie, raza:formEditMessage.raza,edad:formEditMessage.edad, dueño:formEditMessage.dueño,
            contacto:formEditMessage.contacto,historial:formEditMessage.historial
        })
        navigation.goBack();
    }


    //eliminar mensajes
    const handleRemoveMessage=async()=>{

        //referencia 
        const dbRef = ref(dbRealTime,'messages/' + formEditMessage.id);

        await remove(dbRef);

        navigation.goBack();

    }

    return (
        <View >
            <ScrollView>
            <View style={styles.headerHome}>
                <Text variant='labelLarge'>Mascota:</Text>
                <TextInput value={formEditMessage.to} onChangeText={(value)=>handleSetValues("to",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium'>Motivo: </Text>
                <TextInput value={formEditMessage.subject} onChangeText={(value)=>handleSetValues("subject",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Descripcion: </Text>
                <TextInput value={formEditMessage.message}
                multiline={true}
                numberOfLines={8} 
                onChangeText={(value)=>handleSetValues("message",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Especie:</Text>
                <TextInput value={formEditMessage.especie} onChangeText={(value)=>handleSetValues("especie",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Raza: </Text>
                <TextInput value={formEditMessage.raza} onChangeText={(value)=>handleSetValues("raza",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Edad: </Text>
                <TextInput value={formEditMessage.edad} onChangeText={(value)=>handleSetValues("edad",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Dueño: </Text>
                <TextInput value={formEditMessage.dueño} onChangeText={(value)=>handleSetValues("dueño",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Contacto: </Text>
                <TextInput value={formEditMessage.contacto} onChangeText={(value)=>handleSetValues("contacto",value)}></TextInput>
            </View>
            <View style={styles.headerHome}>
                <Text variant='bodyMedium' style={{flex:1}}>Historial Medico: </Text>
                <TextInput value={formEditMessage.historial} 
                multiline={true}
                numberOfLines={8}
                onChangeText={(value)=>handleSetValues("historial",value)}></TextInput>
            </View>
            

            <Button mode="contained" style={{marginVertical:10}} icon="email-sync-outline" onPress={handleUpdateMessage}>Actualizar</Button>
            <Button mode="contained" style={{marginVertical:5}} icon="email-remove-outline" onPress={handleRemoveMessage}>Eliminar</Button>
            </ScrollView>
        </View>
    )
}
