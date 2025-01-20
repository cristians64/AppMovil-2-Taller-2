import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { ScrollView, View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';


//interface paso de prop

interface Props {
    modalMessage: boolean;
    setModalMessage: Function;
}

//fromulario
interface FormMessage {
    to: string;
    subject: string;
    message: string;
    especie: string;
    raza: string;
    edad: string;
    dueño: string;
    contacto: string;
    historial: string;
}


export const NewMessageComponent = ({ modalMessage, setModalMessage }: Props) => {

    const [formMessage, setFormMessage] = useState<FormMessage>({
        to: '',
        subject: '',
        message: '',
        especie: '',
        raza: '',
        edad: '',
        dueño: '',
        contacto: '',
        historial: '',
    })

    const handleSetValues = (key: string, value: string) => {
        setFormMessage({ ...formMessage, [key]: value })
    }

    //funcion que agrega nuevos mensajes
    const handlesaveMessage = async () => {

        if (!formMessage.to || !formMessage.subject || !formMessage.message) {
            return;
        }

        const dbRef = ref(dbRealTime, 'messages');

        const saveMessage = push(dbRef);

        try {
            await set(saveMessage, formMessage);
            setFormMessage({
                to: '',
                subject: '',
                message: '',
                especie: '',
                raza: '',
                edad: '',
                dueño: '',
                contacto: '',
                historial: '',
            });

        } catch (ex) {
            console.log(ex)
        }

        setModalMessage(false)
    }


    return (
        <Portal>
            <Modal visible={modalMessage} contentContainerStyle={styles.modalProfile}>
                <ScrollView>
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
                <Divider />
                <TextInput
                    label='Mascota'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('to', value)}
                />
                <TextInput
                    label='Motivo'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('subject', value)}
                />
                <TextInput
                    label='Descripcion'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('message', value)}
                    multiline={true}
                    numberOfLines={8}
                />
                <TextInput
                    label='Especie'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('especie', value)}
                />
                <TextInput
                    label='Raza'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('raza', value)}
                />
                <TextInput
                    label='Edad'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('edad', value)}
                />
                <TextInput
                    label='Dueño'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('dueño', value)}
                />
                <TextInput
                    label='Contacto'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('contacto', value)}
                />
                <TextInput
                    label='Historial Medico'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('historial', value)}
                />

                <Button mode='contained' onPress={handlesaveMessage}>Ingresar</Button>
                </ScrollView>
            </Modal>
        </Portal>
    )
}
