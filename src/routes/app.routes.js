import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from '../pages/SingIn';
import ChatRoom from '../pages/ChatRoom';
import Messages from '../pages/Messages';
import Find from '../pages/Find';


const AppStack = createNativeStackNavigator();


function AppRoutes() {
    return(

        <AppStack.Navigator initialRouteName="ChatRoom">
            <AppStack.Screen name="SingIn" component={SingIn}
            options={{
                title:'Faça Login'


            }}
            />
            <AppStack.Screen name='ChatRoom' component={ChatRoom}
            options={{
                title:'tela ChatRoom',
                headerShown:false
                

            }}

            />
            <AppStack.Screen name='Messages' component={Messages}
            options={({route}) => ({

                title: route.params.treads.name

            })}
               

            
            />

            <AppStack.Screen
                name='Buscar' component={Find}
              
            />
            

        </AppStack.Navigator>

    )

}


export default AppRoutes;
