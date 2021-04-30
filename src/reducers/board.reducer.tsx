import React from 'react'

export type Item = {
    id: string
    x: number
    y: number
    connectedTo?: string | null
}

export type Action =
    { type: 'add', payload: Item }
    | { type: 'update', payload: Item }
    | { type: 'remove', payload: Partial<Item> & {id: string} }
    | { type: 'connect', payload: [string, string] }
    | { type: 'disconnect', payload: [string, string] }
    | { type: 'save-state', payload: 'localStorage' | 'project' }

export const boardReducer = (state: {[id: string]: Item}, action: Action): {[id: string]: Item} => {
    switch (action.type) {
        case "add":
            return {...state, [action.payload.id]:{...action.payload, connectedTo: null}}

        case "update":
            if(!state.hasOwnProperty(action.payload.id)) return state
            return {...state, [action.payload.id]:{...action.payload, connectedTo: state[action.payload.id].connectedTo}}

        case "remove":
            let newState = {...state};
            delete newState[action.payload.id];
            return newState

        case "save-state":
            localStorage.setItem('items', JSON.stringify(state))
            console.log('state saved in local storage')
            return state

        default:
            console.log('invalid action')
    }
    return state
}

