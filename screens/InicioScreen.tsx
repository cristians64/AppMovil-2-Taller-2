import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormLogin{
    email:string;
    password:string;
}


interface ShowMessage{
    visible: boolean;
    message: string;
    color: string;
  }

export const InicioScreen = () => {
  
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email:"",
        password:""
    })

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"blank"
      })

    const [password, setPassword] = useState<boolean>(true)

    const navigation = useNavigation();
    
    const handleSetValues=(key:string, value:string) => {
        setFormLogin({...formLogin, [key]:value})
    }

    const handleLogin = async () =>{
        if(!formLogin.email || !formLogin.password){
            setShowMessage({visible:true, message:"Completa todos los campos",color:"red"});
            return;
        }
        console.log(formLogin);

        try{
            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
            //console.log(response);
        }
        catch(ex){
            console.log(ex)
            setShowMessage({visible:true, message:"Las credenciales son incorrectas",color:"red"});
        }
    }

  
    return (
    <View style={styles.root}>
        <Text>INICIAR SESION</Text>

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
            secureTextEntry = {password}
            right={<TextInput.Icon icon="eye" onPress={()=>setPassword(!password)}/>}
            onChangeText={(value)=>handleSetValues("password",value)}
            style={styles.inputs}
            
        />
        <Button icon="camera" mode="contained" onPress={handleLogin}>
            Inicia Sesion
        </Button>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={ () => setShowMessage({ ...showMessage, visible:false})}
          style={{backgroundColor: showMessage.color}}>
          {showMessage.message}
        </Snackbar>
        <Text style={styles.textlink} onPress={()=>navigation.dispatch(CommonActions.navigate({name:"RegisterScreen"}))}>Deseas registrate da clic aqui</Text>

    </View>
  )
}
