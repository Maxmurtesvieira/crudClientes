import React, { createContext, useReducer } from "react";
import users from "../data/users";

const initialState = { users }
const UsersContext = createContext({})

const actions = {

    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state, //clonando o estado atual
            users: state.users.map(u => u.id === updated.id ? updated : u) //Se elemento atual 'u.id' tem o id exatamente igual '===' ao elemento atualizado 'updated.id' então '?' ele retorna o elemento atualizado 'updated' e caso contrário ':' ele retorna o próprio elemento 'u'
        }

    },

    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state, //clonando o stado atual
            users: [...state.users, user], //fazendo um clone do usuário atual e inserindo o novo
        }
    },

    deleteUser(state, action) {
        const user = action.payload
            return {
                ...state, //clonando o estado atual
                users: state.users.filter(u => u.id !== user.id) //método 'filter' sempre retorna um array NOVO.
            }
        }
}

export const UsersProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state,action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext