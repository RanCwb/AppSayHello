import React,{useState,useEffect} from "react";
import { View,Text,
    Button,StyleSheet
    ,SafeAreaView,
    TouchableOpacity,
    Modal, ActivityIndicator, FlatList,Alert}
     from "react-native";
import {useNavigation,useIsFocused,} from "@react-navigation/native"
import Icon from "react-native-vector-icons/Feather"
import auth from "@react-native-firebase/auth"
import FaButton from "../../components/FabButton";
import ModalNew from "../../components/ModalNew";
import firestore from "@react-native-firebase/firestore"
import ListChat from "../../components/ListChat";



export default function ChatRoom() {

    

    const IsFocused = useIsFocused();
    const [visibleModal,setVisibleModal] = useState(false);

    const navigation = useNavigation();

    const [user,setUser] = useState(null)
    const [treads, setTreads] = useState([])
    const [Loading, setLoading] = useState(true)
    const [tela,setTela] = useState(false)


    useEffect(() =>{

        const userLog = auth().currentUser ? auth().currentUser.toJSON() : null
        // console.log(userLog)
        setUser(userLog)

    },[IsFocused])

    useEffect(() =>{

        let isActive = true

        function chats() {

            firestore().collection('MESSAGE_THREADS')
            .orderBy('lastMessage.createdAt', 'desc')
            .limit(10)
            .get()
            .then((snapshot) =>{
            
                const msg = snapshot.docs.map((docSnap) =>{

                     return{

                        _id: docSnap.id,
                        name: '',
                        lastMessage: { texte: ''},
                        ...docSnap.data()

                     }

                })

                if(isActive){

                    setTreads(msg)
                    setLoading(false)
                   

                }

               
            })

            
        }

        chats();

        return () => {

            isActive = false

        }


    },[IsFocused,tela])

    function deleteRoom(owner,idRoom ) {

      if (owner !== user?.uid) return; 
        
      Alert.alert(
        "Atenção!",
        "Você tem certeza que deseja deletar essa sala?",
        [
            {
                text:"CANCELAR",
                onPress: () => {},
                style: "cancel"

            },
            {
                text:"Sim,Deletar",
                onPress: () => deleteR(idRoom),

            }
            
        ]

      )
      

     }

     async function deleteR(idRoom) {

        await firestore().collection('MESSAGE_THREADS')
        .doc(idRoom)
        .delete();
        setTela(!tela)
        
     }

    function find() {
        navigation.navigate('Find')
    }

    function exit() {
        auth()
        .signOut()
        .then(() =>{

            setUser(null)
            navigation.navigate('SingIn')



        })
        .catch((error) =>{


            console.log('Sem USERS!')


        })
    }

    if(Loading) {
        return(
            <ActivityIndicator size='large' color="#555"/> 
        )

    }      

    return(
            
           
        

        <SafeAreaView style={styles.container}>  
            <View style={styles.room}>
                <View style={styles.romTwo}>

                    {user && (

                        <TouchableOpacity onPress={exit}>
                        <Icon name="arrow-left" size={30} color="#121212"/>
                        </TouchableOpacity> 


                    )}

                    <Text style={styles.titulo}>Atendimentos</Text>
                </View>
                <TouchableOpacity onPress={find}>
                        <Icon name="search" size={30} color="#121212"/>
                </TouchableOpacity>

            </View>

            <FlatList
                data={treads}
                keyExtractor={ key => key._id }
                showsVerticalScrollIndicator={false}
                renderItem={ ({item}) => (

                <ListChat
                data={item}
                deleteRoom={() => deleteRoom(  item.owner ,item._id)}
                status={user}
                />

                )}
                  
                
            />

            <FaButton  
                setVisible={ () => setVisibleModal(true)}
                status={user}
            />

        <Modal
           visible={visibleModal}
           animationType="fade"
           transparent={true}
        >
             <ModalNew setVisible={ () => setVisibleModal(false)}
                        setUpdate={ () => setTela(!tela)}
             />
        </Modal>
                 
                 
                 
      
        </SafeAreaView>


    )
    
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#fff"

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