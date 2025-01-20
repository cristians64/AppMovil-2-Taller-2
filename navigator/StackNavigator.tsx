import { createStackNavigator } from '@react-navigation/stack';
import { InicioScreen } from '../screens/InicioScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { styles } from '../theme/styles';
import { DetailsScreen } from '../screens/HomeScreen/DetailsScreen';


interface Routes{
  name: string;
  screen: () => JSX.Element;
  headerShown?:boolean;
}

//no autenticados
const routes: Routes[] =[
  {name:"InicioScreen",screen:InicioScreen},
  {name:"RegisterScreen",screen:RegisterScreen},
  {name:"HomeScreen",screen:HomeScreen,headerShown:false},
  {name:"DetailsScreen",screen:DetailsScreen,headerShown:true}
]


const Stack = createStackNavigator();

export const StackNavigator = ()=> {

  //verificar la autenticacion

  const [isAuth, setIsAuth] = useState<boolean>(false)

  //autiviti indicator
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  //estado de autenticacion

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth,(user)=>{
      //validacion de autenticacion
      if(user){
        //console.log(user);
        setIsAuth(true)
      }
      setIsLoading(false);
    });
    return () => {
    }
  }, [])
  

  return (
    <>
      {
      isLoading
      ?(
      <View style={styles.root}>
        <ActivityIndicator animating={true} />
      </View>
      ):(
      <Stack.Navigator initialRouteName={isAuth?'HomeScreen':'InicioScreen'}>
        {
          
          routes.map((item, index)=>(
            <Stack.Screen key={index} name={item.name} options={{headerShown:item.headerShown ?? false}} component={item.screen} />
            ))
        }
        
      </Stack.Navigator>
      )}
    </>
  );
}