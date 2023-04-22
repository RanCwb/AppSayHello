
import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,SafeAreaView,FlatList,KeyboardAvoidingView,Platform,TextInput,TouchableOpacity} from "react-native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import metroConfig from "../../../metro.config";
import MainMessage from "../../components/MainMessage";
import Feather from "react-native-vector-icons/Feather"


export default function Messages({route}) {

    const {treads} = route.params;
    const [status, setStatus] = useState([])
    const [input,setInput] = useState('')
    const user = auth().currentUser.toJSON()

   async function sendy() {

      if(input === '') return;
 
     await  firestore().collection('MESSAGE_THREADS')
      .doc(treads._id)
      .collection('MESSAGES')
      .add({
        text: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName
        }

      })

      await firestore()
      .collection('MESSAGE_THREADS')
      .doc(treads._id)
      .set(
        {
          lastMessage: {
            text: input,
            createdAt: firestore.FieldValue.serverTimestamp(),
          }
        },{

          merge: true


        }
      )
      setInput('')
    }


    useEffect(() =>{

     const  newMessage = firestore().collection('MESSAGE_THREADS')
     .doc(treads._id)
     .collection('MESSAGES')
     .orderBy('createdAt', 'desc')
     .onSnapshot(takeMessage =>{

       const messages = takeMessage.docs.map(doc =>{

          const firebaseDate = doc.data()  

          const data = {
             
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseDate

          }
        
          if (!firebaseDate.sytem) {
            data.user ={
                ...firebaseDate.user,
                name: firebaseDate.user.displayName
            }
          }

          return data;
            
       })

         setStatus(messages)
        console.log(messages)
     } )
    
      return () =>{
 
        newMessage();
  
      }

    },[])


    return(

        <SafeAreaView style={styles.container}>  
           <FlatList
           style={{width:'100%'}}
         data={status}
         keyExtractor={item => item._id}
         renderItem={({item}) => <MainMessage data={item}/>}
         inverted={true}
           />

          <KeyboardAvoidingView
          behavior={Platform.OS ==='ios' ? "padding" : "height"}
          style={{ width:"100%"}}
          keyboardVerticalOffset={100}
          >
            <View style={styles.containerInput}>

                 <View style={styles.mainContInput}>
                        <TextInput
                        placeholder="Sua mensagem..."
                        style={styles.txt}
                        value={input}
                        onChangeText={(text) =>setInput(text) }
                        multiline={true}
                        autoCorrect={false}
                        />
                 </View>

                 <TouchableOpacity onPress={sendy}>
                          <View style={styles.buttonCont}>
                            <Feather name="send" size={25} color='#fff'/>
                          </View>
                 </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>


    )
    
}

const styles = StyleSheet.create({
 container:{

    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20
 },
containerInput:{

  flexDirection:"row",
  margin:10,
  alignItems:"flex-end",
 

},
mainContInput:{

  flexDirection:"row",
  alignItems:'center',
  backgroundColor:'#fff',
  borderRadius: 10,
  width:'80%',
  color:'#121212'


},
txt:{

  flex:1,
  marginHorizontal:10,
  maxHeight:130,
  minHeight:48,
  color:'#121212'
  
},
buttonCont:{

  backgroundColor:'green',
  height: 60,
  alignItems:"center",
  justifyContent:'center',
  width:60,
  borderRadius:30,
  marginLeft:20,
  color:'#fff'
 
}


})