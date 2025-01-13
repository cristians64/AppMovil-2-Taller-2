import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    inputs:{
        width:"90%",
        
    },
    textlink:{
        color:"blue",
        marginTop:10    
    },
    rootHome:{
        flex:1,
        marginVertical:55,
        marginHorizontal:20
    },
    headerHome:{
        flexDirection:'row',
        alignItems:'center',
        gap:15
    },
    IconProfile:{
        flex:1,
        alignItems:'flex-end' 
    }
    ,
    modalProfile:{
        padding:20,
        backgroundColor: 'white',
        borderRadius:20,
        gap:10
    },
    rootCard:{
        flexDirection:'row',
        padding:20,
        alignItems:'center'
    },
    fabmessage:{
        position:'absolute',
        bottom:20,
        right:15
    }
})
