import React,{useState} from "react";
import {View,Text, StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, Alert} from 'react-native'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"


 function ModalNew({setVisible,setUpdate}) {

    const [rom, setRom] = useState('')

    const user = auth().currentUser.toJSON();

    function createRoom() {
    
        if(rom === "") return;

        firestore().collection("MESSAGE_THREADS")
        .get()
        .then((shot) => {

            let  userRooms = 0;

            shot.docs.map(docItem =>{

                if(docItem.data().owner === user.uid){

                    userRooms +=1
                
                }

            })

            if (userRooms >= 5) {
                Alert.alert('Você já atingiu o limite de Salas!')
            }else {

                NewRom();

            }


        })

       

    }

    function NewRom() {

        firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name: rom,
            owner: user.uid,
            lastMessage: {
                text:`Say Hello! sala,  ${rom} criada. Bem Vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp()

            }
        })
        .then((RefDoc) => {

            RefDoc.collection('MESSAGES').add({

                text:`Sala ${rom} criado. Bem Vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                sytem:true

            })
            .then(() => {

                setVisible();
                setUpdate();

            })

        })
        .catch((error) =>{

            console.log(error)


        })
    }

    return(

        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={styles.inv}></View>
            </TouchableWithoutFeedback>

            <View  style={styles.content}>
                <Text  style={styles.title}>Novo Atendimento</Text>
                <TextInput
                style={styles.input}
                value={rom}
                onChangeText={(item) => setRom(item)}
                placeholder="Crie uma Sala"
                ></TextInput>

                <TouchableOpacity onPress={createRoom} style={styles.botao}>
                    <Text style={styles.textcreate}>Criar</Text>
                </TouchableOpacity>

            </View>

        </View>





    )
}

export default ModalNew;

const styles = StyleSheet.create({

    container:{

        flex:1,
        backgroundColor :'rgba(34,34,34,0.4)'


    },
    inv:{
        flex:1,
    },
    content:{

        flex:1,
        backgroundColor:'#fff',
        padding:15


    },
    title:{

        textAlign:"center",
        fontSize:20,
        color:"#121212"

    },
    input:{

        borderRadius: 5,
        height:45,
        backgroundColor:'#ddd',
        marginVertical:15,
        fontSize:20,
        paddingHorizontal:5


    },
    botao:{

        borderRadius:5,
        backgroundColor:'#2E8B57',
        height:50,
        alignItems:"center",
        justifyContent:'center'
    },
    textcreate:{

        fontSize:25,
        fontStyle:'italic',
        fontWeight:'bold'
        
        


    }



})