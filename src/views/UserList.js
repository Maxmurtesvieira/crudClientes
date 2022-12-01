import { Avatar, ListItem } from "@rneui/themed";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import React, { useContext } from "react";
import { View, FlatList, Alert } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import UsersContext from "../context/UserContext";

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user){
        
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?',[
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])

    }

    function getUserItem({ item: user }) {
        return (

            <ListItem 
            bottomDivider
            onPress={() => props.navigation.navigate('UserForm', user)}
            key={user.id}
            > 
                <Avatar source={{uri : user.avatarUrl}}/>
                <ListItemContent>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItemContent>            
                    <Icon.Button name="edit" size={20} color="orange" backgroundColor="white" onPress={() => props.navigation.navigate('UserForm', user)}  />
                    <Icon.Button name="trash" size={20} color="orange" backgroundColor="white" onPress={() => confirmUserDeletion(user)} />                
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}