import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ListChat({data,deleteRoom,status}){
    
    const navigation = useNavigation();

    function GoChat() {
       
        if (status) {
            navigation.navigate('Messages', {treads: data})
        }else {
            navigation.navigate('SingIn')
        }
    
    }

    return(

        <TouchableOpacity onPress={GoChat}  onLongPress={ () => deleteRoom && deleteRoom() }>
            <View style={styles.row}>
                <View style={styles.content}>
                    <View style={styles.base}>
                        <Text style={styles.text} numberOfLines={1}>{data.name}</Text>
                    </View>
                        <Text style={styles.textt}>{data.lastMessage.text}
                        </Text>
                </View>
            
            </View>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({

    row:{

        paddingHorizontal: 14,
        paddingVertical:15,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor: '#90EE90',
        marginVertical: 4,
        borderRadius: 20

    },
    content:{
        flexShrink: 1

    },
    textt:{
        marginTop: 5,
        color:'#696969'

    },
    text:{

        color:'#121212',
        fontWeight:'bold',
        fontSize:18
    }


})

export default ListChat;