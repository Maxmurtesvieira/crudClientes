import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import { Button, Icon } from "@rneui/themed";
import { UsersProvider } from "./context/UserContext";


//CRUD em React Native - Este APP utilizou o ContextAPI, Hooks (UseState e UseReducer), Navigation Stack e React Native Elements!

const Stack = createNativeStackNavigator()

export default props => {

    return(
        <UsersProvider>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="UserList"
                screenOptions={screenOptions}>
                <Stack.Screen 
                    name="UserList"
                    component={UserList}
                    options={( { navigation } ) => {
                        return {
                            title: "Lista de Usuário",
                            headerRight: () => (
                                <Button 
                                type="clear"
                                onPress={() => navigation.navigate("UserForm")}                                    
                                icon={<Icon name="add" size={25} color="white"/>}                                   
                                >
                                </Button>
                            )
                        }
                    }}
                />
                <Stack.Screen 
                    name="UserForm"
                    component={UserForm}
                    options={{
                        title: "Formulário de Usuários"
                    }}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    </UsersProvider>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTittleStyle: {
        fontWeight: 'bold'
    }
}