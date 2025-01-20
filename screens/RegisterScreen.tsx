import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface FormRegister{
    email:string;
    password:string;
    
}

interface ShowMessage{
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email:"",
    password:"",
    
  });

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible:false,
    message:"",
    color:"blank"
  })

  const [password, setPassword] = useState<boolean>(true)

  const navigation = useNavigation();

  const handleSetValues = (key: string, value: string)=>{
    setFormRegister({...formRegister,[key]:value});
  }

  const handleResgisterUser = async () =>{

    if(!formRegister.email || !formRegister.password){
      setShowMessage({visible:true, message:"Completa todos los campos",color:"red"});
      return;
    }

    //VERIFICACION
    try{
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password,
        
      )
      //console.log(response)
      setShowMessage({visible:true, message:"Registrado exitosamente",color:"green"});
    }
    catch(ex){
      console.log(ex)
      setShowMessage({visible:true, message:"Hubo problemas con el registro, intentelo nuevamente",color:"green"});
    }
  }
  
  return (
    <View style={styles.root}>
        <Text>REGISTRARSE</Text>

        <TextInput
            label="Email"
            mode="outlined"
            placeholder="Escribe tu correo"
            onChangeText={(value)=>handleSetValues("email",value)}
            keyboardType='email-address'
            style={styles.inputs}
            
        />
        <TextInput
            label="Contraseña"
            mode="outlined"
            placeholder="Escribe tu contraseña"
            secureTextEntry
            right={<TextInput.Icon icon="eye" onPress={()=>setPassword(!password)}/>}
            onChangeText={(value)=>handleSetValues("password",value)}
            style={styles.inputs}
        />
        <Button icon="camera" mode="contained" onPress={handleResgisterUser}>
            Registrarse
        </Button>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={ () => setShowMessage({ ...showMessage, visible:false})}
          style={{backgroundColor: showMessage.color}}>
          {showMessage.message}
        </Snackbar>
        <Text style={styles.textlink} onPress={()=>navigation.dispatch(CommonActions.navigate({name:"InicioScreen"}))}>
          Ya tienes una cuenta, Inicia Sesion
          </Text>
        
    </View>
  )
}
