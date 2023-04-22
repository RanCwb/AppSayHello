import React,{useMemo} from "react";
import { View,TextBase,Text,StyleSheet,} from "react-native";
import auth from "@react-native-firebase/auth"

export default function MainMessage({data}) {
 
    const user = auth().currentUser.toJSON()
    const myMsg = useMemo(() =>{

        return data?.user?._id  === user.uid
    
    },[data])

    return(
        <View style={styles.container}>
            <View  style={[
                styles.containertwo,
                {
                    backgroundColor : myMsg ? '#90EE90' : '#fff',
                    marginLeft: myMsg ? 50 : 0,
                    marginRight: myMsg ? 0 : 50
                }
                ]}>

                { !myMsg &&  <Text style={styles.text}>{data?.user?.displayName}</Text>


                }
                 
                  <Text style={styles.textTwo}>{data.text}</Text>
            </View>
        </View>

    )
    
}

const styles = StyleSheet.create({

    container:{
      paddingHorizontal:10,
      paddingVertical: 6

    },
    containertwo:{

     borderRadius: 8,
     padding: 12,
   

    },
    text:{
     color:'red',
     fontWeight:'bold',
     marginBottom:5,


    }

})