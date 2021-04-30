import React, {createContext, Dispatch, useReducer} from 'react'
import {Action, boardReducer} from "../reducers/board.reducer";


const initialState: Parameters<typeof boardReducer>[0] = {
    'Signup.form.return': {
        id: 'Signup.form.return',
        x: 100,
        y: 200,
        connectedTo: 'signup.arg'
    },
    'signup.arg': {
        id: 'signup.arg',
        x: 312,
        y: 23
    },
    'signup.return': {
        id: 'signup.return',
        x: 100,
        y: 200,
        connectedTo: 'Switch.arg'
    },
    'Switch.arg': {
        id: 'Switch.arg',
        x: 312,
        y: 23,
        connectedTo: null
    },
    'Switch.forward': {
        id: 'Switch.forward',
        x: 312,
        y: 23,
        connectedTo: 'GetToken.arg'
    },
    'GetToken.arg': {
        id: 'GetToken.arg',
        x: 312,
        y: 23,
        connectedTo: null
    },
    'Switch.error': {
        id: 'Switch.error',
        x: 312,
        y: 23,
        connectedTo: 'Transform.arg'
    },
    'Transform.arg': {
        id: 'Transform.arg',
        x: 312,
        y: 23,
        connectedTo: 'fourth'
    },
    'GetToken.return': {
        id: 'GetToken.return',
        x: 312,
        y: 23,
        connectedTo: 'Response.arg'
    },
    'Transform.return': {
        id: 'Transform.return',
        x: 312,
        y: 23,
        connectedTo: 'Response.arg'
    },
    'Response.arg': {
        id: 'Response.arg',
        x: 312,
        y: 23
    }
}

const BoardContext = createContext<{
    state: Parameters<typeof boardReducer>[0]
    dispatch: Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null
})


const BoardContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(boardReducer,  initialState);

    return (
        <BoardContext.Provider value={{state, dispatch}}>
            {children}
        </BoardContext.Provider>
    )
}


export {BoardContextProvider, BoardContext}


