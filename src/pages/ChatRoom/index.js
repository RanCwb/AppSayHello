import React from "react";
import { View,Text,Button,StyleSheet,SafeAreaView,TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native"
import Icon from "react-native-vector-icons/Feather"
import auth from "@react-native-firebase/auth"



export default function ChatRoom() {

    const navigation = useNavigation();

    function exit() {
        auth()
        .signOut()
        .then(() =>{

            navigation.navigate('SingIn')



        })
        .catch((error) =>{


            console.log('Sem USERS!')


        })
    }


    return(

        <SafeAreaView style={styles.container}>  
            <View style={styles.room}>
                <View style={styles.romTwo}>
                    <TouchableOpacity onPress={exit}>
                        <Icon name="arrow-left" size={25} color="#121212"/>
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Grupos</Text>
                </View>
                <TouchableOpacity>
                        <Icon name="search" size={25} color="#121212"/>
                </TouchableOpacity>

            </View>
        </SafeAreaView>


    )
    
}

const styles = StyleSheet.create({

    container:{
        flex:1,
      

    },
    room:{

        flexDirection: "row",
        justifyContent:"space-between",
        paddingTop :40,
        paddingBottom:40,
        paddingHorizontal:10,
        backgroundColor:"#2E8B57",
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,


    },
    romTwo:{

    flexDirection:"row",
    alignItems:"center"



    },
    titulo:{
        fontSize:30,
        fontWeight:'bold',
        paddingLeft:25,
        



    }




})