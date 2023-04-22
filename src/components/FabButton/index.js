import React from "react"
import {View,Text,TouchableOpacity, StyleSheet,}from "react-native"
import {  useNavigation} from "@react-navigation/native";

function FaButton({setVisible,status}) {

    const navigation = useNavigation()

    function navi() {

        status ? setVisible() : navigation.navigate('SingIn')

        
        
    }


    return(

        <TouchableOpacity
        activeOpacity={0.8}
        onPress={navi}
        style={styles.container}
        >
            <View style={styles.veja}>
                <Text style={styles.titulo}> + </Text>
            </View>

        </TouchableOpacity>




    )
}

export default FaButton;

const styles = StyleSheet.create({

    container:{

        backgroundColor:'#2E8B57',
        width: 60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom: '5%',
        right: '5%'
        
        


    },
    veja:{





    },
    titulo:{


        fontSize:30,
        color:'#fff',
        fontWeight:'bold',
      
        


    }


})