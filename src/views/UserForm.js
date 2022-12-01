import React, { useContext, useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersContext from "../context/UserContext";

export default props => {
    const [user,setUser] = useState(props.route.params ? props.route.params : {});
    const [text, setText] = useState(false);
    const { dispatch } = useContext(UsersContext)

    const editarUrlAvatar = () => {
    if(text == false){
        setText(true);
        } else if (text == true){
            setText(false);
            }
    }

    return(
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput 
                style={style.input}
                onChangeText={name => setUser({...user, name})}
                placeholder="Informe o Nome"
                value={user.name}
            />
            <Text>Email</Text>
            <TextInput 
                style={style.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Informe o E-mail"
                value={user.email}
            />
            <View style={{flexDirection:"row", alignItems:"baseline"}}>
                <Text>URL do Avatar</Text>
                <Icon.Button name="edit" size={12} color="orange" backgroundColor={'transparent'} onPress={editarUrlAvatar} />                
            </View>
                <TextInput 
                    style={style.input}
                    onChangeText={avatarUrl => setUser({...user, avatarUrl})}
                    placeholder="Informe a URL do Avatar"
                    value={user.avatarUrl}   
                    editable={text}             
                />
            <Button 
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    })
                    props.navigation.goBack()
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
    }
})