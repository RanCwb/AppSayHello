import React,{useState} from "react";
import { View,Text,TouchableOpacity} from "react-native";
import {Container,Logo,Texto,Botao,BotaoLogin,Acess,BotaoSingup} from "./style"
import auth from "@react-native-firebase/auth"
import {useNavigation} from "@react-navigation/native"


export default function SingIn() {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [user, setUser] = useState(false)

    const navigation = useNavigation()

    function logIn() {
        
        if(user){  //cadastrar

            if(name === ' ' || email === ' ') return;

                auth()
                .createUserWithEmailAndPassword(email,password)
                .then((item) =>{

                    item.user.updateProfile({

                        displayName: name,


                    })
                    .then(() =>{

                        navigation.goBack();

                    })



                })
                .catch((error) =>{

                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                      }
                  
                      if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                      }
                  
                      console.error(error);


                })


                console.log('cadastrar')
        } else { //logar

            auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {

                navigation.goBack();

            })
            .catch((error)=>{
                
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                  }
              
                  console.error(error);



            })



            console.log('logar')


        }


    }


    return(

        <Container>  
            <Logo>Lets Talk</Logo>
            <Texto>Fale com o Suporte</Texto>

            {user &&(
            
            <Botao
            value={name}
            onChangeText={(item) => setName(item)}
            placeholder="Digite o seu nome"
            placeholderTextColor="#121212"
            
            />
            
            
            )} 


              <Botao
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Digite o seu email"
            placeholderTextColor="#121212"
            />
              <Botao
            value={password}
            onChangeText={(p) => setPassword(p)}
            placeholder="Digite a sua senha"
            placeholderTextColor="#121212"
            />
           
           <BotaoLogin
            onPress={logIn}
           >

                    <Acess>{user ? 'Cadastrar' : 'Acessar '}</Acess>

           </BotaoLogin>
           <BotaoSingup
            onPress={() => setUser(!user)}
           >
                    <Acess>{user ? 'Já tenha uma conta' : 'Criar Conta'}</Acess>
           </BotaoSingup>
           
           

        </Container>


    )
    
}